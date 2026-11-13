import { Component, signal } from '@angular/core';
import { SITE } from './site-data';

type RequestState = 'idle' | 'sending-otp' | 'code-sent' | 'submitting' | 'success' | 'error';

type DeletionResponse = {
  message?: string | string[];
};

const API_BASE_URL = 'https://clearit-be.vercel.app/api/v1';
const APP_KEY = 'szk_31L9dQQ6DKo-H8h_TO-44nTwZ8o-Kg3A';

@Component({
  selector: 'app-account-deletion-form',
  template: `
    <section class="account-deletion" aria-labelledby="deletion-form-title">
      <div class="account-deletion-card">
        <div class="eyebrow">Account request</div>
        <h2 id="deletion-form-title">Submit a deletion request</h2>
        <p>If an account matches, confirming this request disables its access and records it for follow-up. Some information may be retained for administrative or legal requirements.</p>

        <form #deletionForm (submit)="submit($event, deletionForm)">
          <div class="full">
            <label for="deletion-mobile">Mobile number</label>
            <input
              id="deletion-mobile"
              name="mobile"
              type="tel"
              inputmode="numeric"
              autocomplete="tel-national"
              placeholder="10-digit Indian mobile number"
              pattern="[6-9][0-9]{9}"
              maxlength="10"
              (input)="mobileChanged()"
              required>
          </div>
          @if (!otpSent()) {
            <button
              class="button primary"
              type="button"
              [disabled]="state() === 'sending-otp' || state() === 'submitting'"
              (click)="sendOtp(deletionForm)">
              {{ state() === 'sending-otp' ? 'Sending code…' : 'Send verification code' }}
            </button>
          }
          @if (otpSent()) {
            <div class="full">
              <label for="deletion-otp">Verification code</label>
              <input
                id="deletion-otp"
                name="otp"
                type="text"
                inputmode="numeric"
                autocomplete="one-time-code"
                pattern="[0-9]{4,6}"
                minlength="4"
                maxlength="6"
                required>
              <small>Enter the code sent to your mobile number to confirm ownership.</small>
            </div>
            <button
              class="button secondary"
              type="button"
              [disabled]="state() === 'sending-otp' || state() === 'submitting'"
              (click)="sendOtp(deletionForm)">
              {{ state() === 'sending-otp' ? 'Sending code…' : 'Send a new code' }}
            </button>
          }
          <div>
            <label for="deletion-name">Name (optional)</label>
            <input id="deletion-name" name="name" autocomplete="name" maxlength="100">
          </div>
          <div>
            <label for="deletion-email">Email (optional)</label>
            <input id="deletion-email" name="email" type="email" autocomplete="email" maxlength="255">
          </div>
          <div class="full">
            <label for="deletion-note">Additional details (optional)</label>
            <textarea id="deletion-note" name="note" maxlength="500"></textarea>
          </div>
          @if (otpSent()) {
            <button class="button primary" type="submit" [disabled]="state() === 'submitting'">
              {{ state() === 'submitting' ? 'Submitting…' : 'Confirm and submit deletion request' }}
            </button>
          }
        </form>

        @if (message()) {
          <p class="deletion-message" [class.error]="state() === 'error'" role="status" aria-live="polite">
            {{ message() }}
          </p>
        }
        <p class="deletion-contact">
          Need help? <a [href]="'mailto:' + SITE.privacyEmail">{{ SITE.privacyEmail }}</a>
        </p>
      </div>
    </section>
  `,
})
export class AccountDeletionForm {
  readonly SITE = SITE;
  readonly state = signal<RequestState>('idle');
  readonly otpSent = signal(false);
  readonly message = signal('');

  mobileChanged() {
    this.otpSent.set(false);
    this.state.set('idle');
    this.message.set('');
  }

  async sendOtp(form: HTMLFormElement) {
    const mobile = form.elements.namedItem('mobile');
    if (!(mobile instanceof HTMLInputElement) || !mobile.reportValidity()) return;

    this.state.set('sending-otp');
    this.message.set('');

    try {
      await this.request('/customer/account-deletion/send-otp', {
        mobile: mobile.value.trim(),
      });
      this.otpSent.set(true);
      this.state.set('code-sent');
      this.message.set('A verification code has been sent if this number can receive messages. Enter it below to confirm your request.');
    } catch (error) {
      this.state.set('error');
      this.message.set(this.errorMessage(error));
    }
  }

  async submit(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    if (!this.otpSent() || !form.reportValidity()) return;

    const values = new FormData(form);
    this.state.set('submitting');
    this.message.set('');

    try {
      await this.request('/customer/account-deletion', {
        mobile: String(values.get('mobile') ?? '').trim(),
        otp: String(values.get('otp') ?? '').trim(),
        name: String(values.get('name') ?? '').trim() || undefined,
        email: String(values.get('email') ?? '').trim() || undefined,
        note: String(values.get('note') ?? '').trim() || undefined,
      });

      this.state.set('success');
      this.message.set(
        'Your request was received. If an account exists for that number, access will be disabled. Some records may be retained for administrative or legal requirements.',
      );
      form.reset();
      this.otpSent.set(false);
    } catch (error) {
      this.state.set('error');
      this.message.set(this.errorMessage(error));
    }
  }

  private async request(path: string, payload: Record<string, string | undefined>) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Key': APP_KEY,
        'X-Client-App': 'AIRA',
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    const body = text ? (JSON.parse(text) as DeletionResponse) : {};
    if (!response.ok) {
      const detail = Array.isArray(body.message) ? body.message.join(', ') : body.message;
      throw new Error(detail || `Request failed (${response.status}).`);
    }
    return body;
  }

  private errorMessage(error: unknown) {
    return error instanceof Error
      ? `We could not complete your request. ${error.message}`
      : `We could not complete your request. Please email ${SITE.privacyEmail}.`;
  }
}
