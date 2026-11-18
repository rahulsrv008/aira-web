import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccountDeletionForm } from '../site/account-deletion-form';
import { AppDownloadButton } from '../site/app-download-button';
import { PartnerInquiryForm } from '../site/partner-inquiry-form';
import { pageSchema, Seo } from '../site/seo';
import { CITY_CARDS, PageContent, pageByPath, SERVICE_CARDS } from '../site/site-data';
import { SiteFooter } from '../site/site-footer';
import { SiteHeader } from '../site/site-header';

@Component({
  selector: 'app-info-page',
  imports: [RouterLink, SiteHeader, SiteFooter, AppDownloadButton, AccountDeletionForm, PartnerInquiryForm],
  template: `
    <app-site-header />
    <main>
      <section class="page-hero" [style.background-image]="'url(' + page.image + ')'">
        <div class="page-hero-content">
          <nav class="crumbs" aria-label="Breadcrumb">
            <a routerLink="/">Home</a>
            @if (page.kind === 'service') {
              <span aria-hidden="true">›</span><a routerLink="/services">Services</a>
            }
            <span aria-hidden="true">›</span><span aria-current="page">{{ page.label }}</span>
          </nav>
          <div class="eyebrow">{{ page.kicker }}</div>
          <h1>{{ page.h1 }}</h1>
          <p>{{ page.intro }}</p>
          @if (page.kind !== 'contact' && page.kind !== 'partner' && page.kind !== 'privacy' && page.kind !== 'delete-account') {
            <div class="hero-actions">
              <app-download-button label="Book an Appointment →" />
              @if (page.kind !== 'services') {
                <a class="text-link" routerLink="/services">All services</a>
              }
            </div>
          }
        </div>
      </section>

      @if (page.kind !== 'privacy' && page.kind !== 'delete-account') {
        <div class="trustbar">
          <div class="trust-item"><span class="trust-icon">✧</span> Since 2000</div>
          <div class="trust-item"><span class="trust-icon">⌂</span> Comfort of home</div>
          <div class="trust-item"><span class="trust-icon">⌖</span> Delhi · Noida · Gurgaon</div>
          <div class="trust-item"><span class="trust-icon">◇</span> Book through the Aira app</div>
        </div>
      }

      @if (page.kind === 'contact') {
        <section class="contact">
          <div class="contact-wrap single">
            <div class="contact-intro">
              <div class="eyebrow">Questions or a booking?</div>
              <h2>We're happy to help.</h2>
              <p>For appointments, choose your platform and book through the Aira app.</p>
              <div class="contact-detail">
                @for (city of cities; track city.path) {
                  <div>⌖ <a [routerLink]="'/' + city.path">{{ city.name }}</a></div>
                }
              </div>
              <app-download-button label="Get the Aira app" />
            </div>
          </div>
        </section>
      }

      @if (page.kind === 'partner') {
        <app-partner-inquiry-form />
      }

      @if (page.kind === 'services') {
        <section class="services">
          <div class="section-heading">
            <div class="eyebrow">Aira signature services</div>
            <h2>Choose a service</h2>
          </div>
          <div class="service-grid">
            @for (service of services; track service.path) {
              <a class="service-card cover" [routerLink]="'/' + service.path">
                <div class="service-photo" role="img" [attr.aria-label]="service.alt" [style.background-image]="'url(' + service.image + ')'"></div>
                <div class="service-copy">
                  <span>{{ service.kicker }}</span>
                  <h3>{{ service.title }}</h3>
                  <p>{{ service.copy }}</p>
                </div>
              </a>
            }
          </div>
        </section>
      }

      @if (page.sections.length) {
        <article class="page-body">
          @if (page.kind !== 'privacy' && page.kind !== 'delete-account') {
            <img class="page-photo" [src]="page.image" [alt]="page.imageAlt" width="1024" height="571" loading="lazy">
          }
          @for (section of page.sections; track section.heading) {
            <section class="copy-block">
              <h2>{{ section.heading }}</h2>
              @for (paragraph of section.paragraphs ?? []; track $index) {
                <p>{{ paragraph }}</p>
              }
              @if (section.list?.length) {
                <ul>
                  @for (item of section.list; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              }
              @if (section.link; as link) {
                <a class="text-link dark" [routerLink]="link.path">{{ link.label }} →</a>
              }
            </section>
          }
        </article>
      }

      @if (page.kind === 'delete-account') {
        <app-account-deletion-form />
      }

      @if (page.kind === 'city') {
        <section class="link-band">
          <h2>Services in {{ page.label }}</h2>
          <div class="chip-links">
            @for (service of services; track service.path) {
              <a [routerLink]="'/' + service.path">{{ service.title }}</a>
            }
          </div>
        </section>
      }

      @if (page.kind === 'service' || page.kind === 'about' || page.kind === 'services') {
        <section class="link-band">
          <h2>{{ page.kind === 'service' ? 'Available in' : 'Where we serve' }}</h2>
          <div class="area-grid">
            @for (city of cities; track city.path) {
              <a class="area-card" [routerLink]="'/' + city.path">
                <strong>{{ city.name }}</strong>
                <span>{{ city.copy }}</span>
              </a>
            }
          </div>
          @if (page.kind === 'service') {
            <h3 class="more-heading">More services</h3>
            <div class="chip-links">
              @for (service of otherServices; track service.path) {
                <a [routerLink]="'/' + service.path">{{ service.title }}</a>
              }
            </div>
          }
        </section>
      }

      @if (page.faqs?.length) {
        <section class="faq" aria-labelledby="faq-title">
          <h2 id="faq-title">Questions</h2>
          @for (faq of page.faqs; track faq.q) {
            <details>
              <summary>{{ faq.q }}</summary>
              <p>{{ faq.a }}</p>
            </details>
          }
        </section>
      }

      <section class="quote">
        <blockquote>{{ page.closing }}</blockquote>
        @if (page.kind !== 'contact' && page.kind !== 'partner' && page.kind !== 'privacy' && page.kind !== 'delete-account') {
          <app-download-button label="Book an Appointment →" />
        }
      </section>
    </main>
    <app-site-footer />
  `,
})
export class InfoPage {
  readonly page: PageContent;
  readonly services = SERVICE_CARDS;
  readonly cities = CITY_CARDS;
  readonly otherServices: typeof SERVICE_CARDS;

  constructor() {
    const path = inject(ActivatedRoute).snapshot.data['page'] as string;
    this.page = pageByPath(path)!;
    this.otherServices = SERVICE_CARDS.filter((service) => service.path !== path);

    inject(Seo).set({
      path: this.page.path,
      title: this.page.seoTitle,
      description: this.page.description,
      image: this.page.image,
      schema: pageSchema(this.page),
    });
  }
}
