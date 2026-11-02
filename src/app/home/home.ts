import { Component, OnDestroy, signal } from '@angular/core';

const SLIDES = [
  '/images/hero-facial.jpg',
  '/images/hero-ritual.jpg',
  '/images/hero-hair.jpg',
  '/images/hero-team.jpg',
];

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnDestroy {
  readonly year = new Date().getFullYear();
  readonly slides = SLIDES;
  readonly active = signal(0);
  readonly menuOpen = signal(false);
  readonly services = [
    { kicker: '01 · Skin', title: 'Facials & Skin Care', copy: 'A fresh, radiant feeling from the comfort of home.', image: '/images/service-facial.jpg', cover: false },
    { kicker: '02 · Hair', title: 'Hair Styling & Care', copy: 'Beautiful hair days, made effortless.', image: '/images/service-hair.jpg', cover: false },
    { kicker: '03 · Nails', title: 'Manicure & Pedicure', copy: 'Polished details and a moment to unwind.', image: '/images/service-nails.jpg', cover: false },
    { kicker: '04 · Occasion', title: 'Party & Bridal Makeup', copy: 'Feel unforgettable for every celebration.', image: '/images/service-bridal.jpg', cover: false },
    { kicker: '05 · Care', title: 'Waxing & Grooming', copy: 'Personal care with comfort and attention.', image: '/images/service-waxing.jpg', cover: false },
    { kicker: '06 · Relax', title: 'Body & Spa Rituals', copy: 'Slow down and make space for yourself.', image: '/images/hero-ritual.jpg', cover: true },
  ];

  private timer = 0;

  constructor() {
    this.schedule();
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

  closeMenu() {
    this.menuOpen.set(false);
  }

  requestBooking(event: Event) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const subject = encodeURIComponent('Aira Luxury booking request');
    const body = encodeURIComponent(
      [
        `Name: ${data.get('name')}`,
        `Phone: ${data.get('phone')}`,
        `Service: ${data.get('service')}`,
        `Preferred date: ${data.get('date') || 'Not specified'}`,
        `Message: ${data.get('message') || '—'}`,
      ].join('\n'),
    );
    window.location.href = `mailto:hello@airaluxury.com?subject=${subject}&body=${body}`;
  }
}
