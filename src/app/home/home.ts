import { Component, OnDestroy, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppDownloadButton } from '../site/app-download-button';
import { homeSchema, Seo } from '../site/seo';
import { CITY_CARDS, HOME_FAQS, SERVICE_CARDS, SITE } from '../site/site-data';
import { SiteFooter } from '../site/site-footer';
import { SiteHeader } from '../site/site-header';

const SLIDES = [
  '/images/hero-facial.jpg',
  '/images/hero-ritual.jpg',
  '/images/hero-hair.jpg',
  '/images/hero-team.jpg',
];

@Component({
  selector: 'app-home',
  imports: [RouterLink, SiteHeader, SiteFooter, AppDownloadButton],
  templateUrl: './home.html',
})
export class Home implements OnDestroy {
  readonly slides = SLIDES;
  readonly active = signal(0);
  readonly services = SERVICE_CARDS;
  readonly cities = CITY_CARDS;
  readonly faqs = HOME_FAQS;
  readonly email = SITE.email;
  readonly reasons = [
    { title: 'Experience', copy: 'In beauty since 2000' },
    { title: 'Convenience', copy: 'No travel, no waiting' },
    { title: 'Personal care', copy: 'Services chosen around you' },
    { title: 'Easy booking', copy: 'A few taps in the app' },
  ];

  private timer = 0;

  constructor() {
    inject(Seo).set({
      path: '',
      title: 'Aira Luxury | Premium Salon at Home in Delhi NCR',
      description: 'Experience Aira Luxury, a beauty business with a journey dating back to 2000. Book haircuts, facials, waxing, hair spa, makeup and more at home in Delhi, Noida and Gurgaon.',
      image: '/images/hero-facial.jpg',
      schema: homeSchema(HOME_FAQS),
    });
    afterNextRender(() => this.schedule());
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  show(index: number) {
    this.active.set(index);
    this.schedule();
  }

  private schedule() {
    clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      this.active.update((index) => (index + 1) % this.slides.length);
    }, 5600);
  }
}
