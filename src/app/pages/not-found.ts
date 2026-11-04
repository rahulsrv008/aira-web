import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../site/seo';
import { SERVICE_CARDS } from '../site/site-data';
import { SiteFooter } from '../site/site-footer';
import { SiteHeader } from '../site/site-header';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, SiteHeader, SiteFooter],
  template: `
    <app-site-header />
    <main>
      <section class="page-hero" style="background-image: url('/images/hero-ritual.jpg')">
        <div class="page-hero-content">
          <div class="eyebrow">Page not found</div>
          <h1>This page has moved on.</h1>
          <p>The page you were looking for isn't here. Explore our home beauty services or book an appointment.</p>
          <div class="hero-actions">
            <a class="button primary" routerLink="/services">Explore services →</a>
            <a class="text-link" routerLink="/">Back to home</a>
          </div>
        </div>
      </section>
      <section class="link-band">
        <h2>Popular services</h2>
        <div class="chip-links">
          @for (service of services; track service.path) {
            <a [routerLink]="'/' + service.path">{{ service.title }}</a>
          }
        </div>
      </section>
    </main>
    <app-site-footer />
  `,
})
export class NotFound {
  readonly services = SERVICE_CARDS;

  constructor() {
    inject(Seo).set({
      path: 'not-found',
      title: 'Page not found | Aira Luxury',
      description: 'This page could not be found. Explore Aira Luxury home beauty services in Delhi NCR.',
      noindex: true,
    });
  }
}
