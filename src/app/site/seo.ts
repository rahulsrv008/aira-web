import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Faq, PageContent, SERVICE_CARDS, SITE } from './site-data';

export interface SeoPage {
  path: string;
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
  schema?: object[];
}

const BUSINESS_ID = `${SITE.url}/#business`;
const WEBSITE_ID = `${SITE.url}/#website`;

const AREA_SERVED = [
  { '@type': 'City', name: 'Delhi' },
  { '@type': 'City', name: 'Noida' },
  { '@type': 'City', name: 'Gurugram', alternateName: 'Gurgaon' },
];

export const pageUrl = (path: string) => (path ? `${SITE.url}/${path}` : `${SITE.url}/`);

/**
 * No street address, phone, rating or price here on purpose: structured data
 * must only state facts the business can stand behind.
 */
const business = {
  '@type': 'BeautySalon',
  '@id': BUSINESS_ID,
  name: SITE.name,
  url: pageUrl(''),
  logo: `${SITE.url}/icons/icon-512.png`,
  image: `${SITE.url}${SITE.defaultImage}`,
  description: 'Aira Luxury brings salon and beauty services to your home across Delhi, Noida and Gurgaon, from a beauty journey that began in 2000.',
  slogan: SITE.slogan,
  foundingDate: SITE.foundingYear,
  areaServed: AREA_SERVED,
  knowsAbout: SERVICE_CARDS.map((card) => card.title),
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: pageUrl(''),
  name: SITE.name,
  inLanguage: 'en-IN',
  publisher: { '@id': BUSINESS_ID },
};

function faqSchema(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}

export function homeSchema(faqs: Faq[]): object[] {
  return [
    business,
    website,
    { '@type': 'WebPage', '@id': `${pageUrl('')}#webpage`, url: pageUrl(''), name: 'Aira Luxury | Premium Salon at Home in Delhi NCR', isPartOf: { '@id': WEBSITE_ID }, about: { '@id': BUSINESS_ID } },
    faqSchema(faqs),
  ];
}

export function pageSchema(page: PageContent): object[] {
  const url = pageUrl(page.path);
  const trail = [{ name: 'Home', path: '' }];
  if (page.kind === 'service') trail.push({ name: 'Services', path: 'services' });
  trail.push({ name: page.name, path: page.path });

  const webPageType = page.kind === 'about' ? 'AboutPage' : page.kind === 'contact' ? 'ContactPage' : 'WebPage';
  const graph: object[] = [
    business,
    website,
    {
      '@type': webPageType,
      '@id': `${url}#webpage`,
      url,
      name: page.seoTitle,
      description: page.description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': BUSINESS_ID },
    },
    breadcrumbs(trail),
  ];

  if (page.kind === 'service') {
    graph.push({
      '@type': 'Service',
      name: page.name,
      serviceType: page.name,
      description: page.description,
      url,
      provider: { '@id': BUSINESS_ID },
      areaServed: AREA_SERVED,
    });
  }
  if (page.kind === 'city' && page.city) {
    graph.push({
      '@type': 'Service',
      name: page.name,
      serviceType: 'Salon at home',
      description: page.description,
      url,
      provider: { '@id': BUSINESS_ID },
      areaServed: AREA_SERVED.filter((area) => area.name === page.city),
    });
  }
  if (page.faqs?.length) graph.push(faqSchema(page.faqs));
  return graph;
}

@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(page: SeoPage) {
    const url = pageUrl(page.path);
    const image = `${SITE.url}${page.image ?? SITE.defaultImage}`;

    this.title.setTitle(page.title);
    const tags: MetaDefinition[] = [
      { name: 'description', content: page.description },
      { name: 'robots', content: page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: 'en_IN' },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: image },
    ];
    for (const tag of tags) this.meta.updateTag(tag);

    this.setCanonical(page.noindex ? null : url);
    this.setStructuredData(page.schema ?? []);
  }

  private setCanonical(url: string | null) {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!url) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setStructuredData(graph: object[]) {
    let script = this.doc.head.querySelector<HTMLScriptElement>('script#structured-data');
    if (!graph.length) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  }
}
