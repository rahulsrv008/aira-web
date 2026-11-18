import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppDownloadButton } from './app-download-button';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, AppDownloadButton],
  template: `
    <header class="topbar">
      <a class="brand" routerLink="/" aria-label="Aira Luxury home">
        <svg viewBox="0 0 54 62" fill="none" aria-hidden="true">
          <path d="M27 5 31 15 42 9 39 21 51 25 39 31 44 44 31 39 27 55 22 39 10 44 15 31 3 25 15 21 12 9 23 15Z" stroke="#D5A45E" stroke-width="1.5"/>
          <path d="M27 19c-8 8-9 17-3 27 2-7 5-12 10-16-1 7-1 12 3 17" stroke="#F0C98E" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M17 53h20" stroke="#D5A45E"/>
        </svg>
        <span class="brand-name">AIRA<small>L U X U R Y</small></span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Open navigation" [attr.aria-expanded]="menuOpen()" (click)="menuOpen.set(!menuOpen())">☰</button>
      <nav class="nav" [class.open]="menuOpen()" aria-label="Main">
        <a routerLink="/services" (click)="close()">Services</a>
        <a routerLink="/" fragment="areas" (click)="close()">Locations</a>
        <a routerLink="/about-aira-luxury" (click)="close()">Since 2000</a>
        <a routerLink="/become-a-partner" (click)="close()">Become a partner</a>
        <a routerLink="/" fragment="faq" (click)="close()">FAQ</a>
        <app-download-button buttonClass="nav-cta" (dismissed)="close()" />
      </nav>
    </header>
  `,
})
export class SiteHeader {
  readonly menuOpen = signal(false);

  close() {
    this.menuOpen.set(false);
  }
}
