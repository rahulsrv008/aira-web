import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppDownloadButton } from './app-download-button';
import { CITY_CARDS, SERVICE_CARDS, SITE } from './site-data';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, AppDownloadButton],
  template: `
    <footer class="site-footer">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" routerLink="/">
            <svg viewBox="0 0 54 62" fill="none" aria-hidden="true"><path d="M27 5 31 15 42 9 39 21 51 25 39 31 44 44 31 39 27 55 22 39 10 44 15 31 3 25 15 21 12 9 23 15Z" stroke="#D5A45E" stroke-width="1.5"/><path d="M27 19c-8 8-9 17-3 27 2-7 5-12 10-16-1 7-1 12 3 17" stroke="#F0C98E" stroke-width="1.5" stroke-linecap="round"/></svg>
            <span class="brand-name">AIRA<small>L U X U R Y</small></span>
          </a>
          <p>Beauty experience since 2000.<br>Delhi · Noida · Gurgaon</p>
          <p>✉ <a [href]="'mailto:' + email">{{ email }}</a></p>
        </div>
        <nav aria-label="Services">
          <h2>Services</h2>
          @for (service of services; track service.path) {
            <a [routerLink]="'/' + service.path">{{ service.title }}</a>
          }
        </nav>
        <nav aria-label="Locations">
          <h2>Locations</h2>
          @for (city of cities; track city.path) {
            <a [routerLink]="'/' + city.path">{{ city.name }}</a>
          }
        </nav>
        <nav aria-label="Aira Luxury">
          <h2>Aira Luxury</h2>
          <a routerLink="/about-aira-luxury">About Aira Luxury</a>
          <a routerLink="/become-a-partner">Become a partner</a>
          <a routerLink="/services">All services</a>
          <app-download-button label="Book an appointment" buttonClass="footer-download-button" />
          <a routerLink="/" fragment="faq">FAQ</a>
          <a routerLink="/privacy-policy">Privacy policy</a>
          <a routerLink="/delete-account">Delete account</a>
        </nav>
      </div>
      <div class="footer-base">
        <p>Bringing beauty home since 2000.</p>
        <p>© {{ year }} Aira Luxury. All rights reserved.</p>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  readonly year = new Date().getFullYear();
  readonly services = SERVICE_CARDS;
  readonly cities = CITY_CARDS;
  readonly email = SITE.email;
}
