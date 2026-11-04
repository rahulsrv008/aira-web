import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CITY_CARDS, SERVICE_CARDS, SITE } from './site-data';

@Component({
  selector: 'app-booking-form',
  template: `
    <form (submit)="requestBooking($event)">
      <div><label for="name">Your name</label><input id="name" name="name" placeholder="Full name" autocomplete="name" required></div>
      <div><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" autocomplete="tel" required></div>
      <div>
        <label for="service">Choose a service</label>
        <select id="service" name="service" required>
          <option value="">Select service</option>
          @for (service of services; track service.path) {
            <option>{{ service.title }}</option>
          }
        </select>
      </div>
      <div>
        <label for="city">Your city</label>
        <select id="city" name="city" required>
          <option value="">Select city</option>
          @for (city of cities; track city.path) {
            <option>{{ city.name }}</option>
          }
        </select>
      </div>
      <div><label for="date">Preferred date</label><input id="date" name="date" type="date"></div>
      <div><label for="locality">Locality or sector</label><input id="locality" name="locality" placeholder="e.g. Dwarka, Sector 62, DLF Phase 3"></div>
      <div class="full"><label for="message">Anything else we should know?</label><textarea id="message" name="message" placeholder="Preferred time or special requests..."></textarea></div>
      <button class="button primary" type="submit">Request a booking →</button>
    </form>
  `,
})
export class BookingForm {
  private readonly doc = inject(DOCUMENT);
  readonly services = SERVICE_CARDS;
  readonly cities = CITY_CARDS;

  requestBooking(event: Event) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const subject = encodeURIComponent('Aira Luxury booking request');
    const body = encodeURIComponent(
      [
        `Name: ${data.get('name')}`,
        `Phone: ${data.get('phone')}`,
        `Service: ${data.get('service')}`,
        `City: ${data.get('city')}`,
        `Locality: ${data.get('locality') || 'Not specified'}`,
        `Preferred date: ${data.get('date') || 'Not specified'}`,
        `Message: ${data.get('message') || '—'}`,
      ].join('\n'),
    );
    this.doc.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }
}
