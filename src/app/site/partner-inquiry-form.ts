import { Component, signal } from '@angular/core';

type RequestState = 'idle' | 'submitting' | 'success' | 'error';

type PartnerInquiryResponse = {
  message?: string | string[];
};

const API_BASE_URL = 'https://clearit-be.vercel.app/api/v1';

@Component({
  selector: 'app-partner-inquiry-form',
  template: `
    <section class="partner-application" aria-labelledby="partner-form-title">
      <div class="partner-application-card">
        <div class="eyebrow">Let's work together</div>
        <h2 id="partner-form-title">Tell us about yourself</h2>
        <p class="partner-intro">
          Share your details and how you'd like to partner with Aira. We'll follow up using the contact
          information you provide.
        </p>

        <form class="partner-form" aria-label="Partner inquiry form" (submit)="submit($event)">
          <div>
            <label for="partner-name">Full name</label>
            <input id="partner-name" name="name" autocomplete="name" maxlength="100" required>
          </div>
          <div>
            <label for="partner-phone">Phone number</label>
            <input id="partner-phone" name="phone" type="tel" autocomplete="tel" maxlength="30" required>
          </div>
          <div>
            <label for="partner-email">Email address <span>(optional)</span></label>
            <input id="partner-email" name="email" type="email" autocomplete="email" maxlength="255">
          </div>
          <div>
            <label for="partner-city">City or area</label>
            <input id="partner-city" name="city" autocomplete="address-level2" maxlength="100" required>
          </div>
          <div class="full">
            <label for="partner-type">How would you like to partner?</label>
            <select id="partner-type" name="partnerType" required>
              <option value="">Select an option</option>
              <option>Beauty professional</option>
              <option>Salon or beauty business</option>
              <option>Other partnership</option>
            </select>
          </div>
          <div class="full">
            <label for="partner-note">A little about your experience <span>(optional)</span></label>
            <textarea id="partner-note" name="note" maxlength="1000" rows="4"></textarea>
          </div>
          <button class="button primary" type="submit" [disabled]="state() === 'submitting'">
            {{ state() === 'submitting' ? 'Sending…' : 'Send partner inquiry →' }}
          </button>
        </form>

        <p class="partner-form-note" role="note">
          Your inquiry will be sent to our team. We’ll follow up using the contact details you provide.
        </p>
        @if (message()) {
          <p class="partner-form-note" [class.error]="state() === 'error'" role="status" aria-live="polite">
            {{ message() }}
          </p>
        }
      </div>
    </section>
  `,
})
export class PartnerInquiryForm {
  readonly state = signal<RequestState>('idle');
  readonly message = signal('');

  async submit(event: Event) {
    event.preventDefault();
    if (this.state() === 'submitting') return;

    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? '').trim();
    const inquiry = {
      name: value('name'),
      phone: value('phone'),
      email: value('email') || undefined,
      city: value('city'),
      partnerType: value('partnerType'),
      note: value('note') || undefined,
    };

    this.state.set('submitting');
    this.message.set('');

    try {
      const response = await fetch(`${API_BASE_URL}/web/partner-inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-App': 'AIRA',
        },
        body: JSON.stringify(inquiry),
      });

      let body: PartnerInquiryResponse;
      try {
        body = (await response.json()) as PartnerInquiryResponse;
      } catch {
        throw new Error(
          response.ok ? 'The server returned an invalid response.' : `Request failed (${response.status}).`,
        );
      }

      if (!response.ok) {
        const detail = Array.isArray(body.message) ? body.message.join(', ') : body.message;
        throw new Error(detail || `Request failed (${response.status}).`);
      }
      if (typeof body.message !== 'string') {
        throw new Error('The server returned an invalid response.');
      }

      this.state.set('success');
      this.message.set(body.message);
      form.reset();
    } catch (error) {
      this.state.set('error');
      this.message.set(
        error instanceof Error
          ? `We could not send your inquiry. ${error.message}`
          : 'We could not send your inquiry. Please try again later.',
      );
    }
  }
}
