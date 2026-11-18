import { Component, ElementRef, HostListener, ViewChild, input, output, signal } from '@angular/core';

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.aira.luxury';

@Component({
  selector: 'app-download-button',
  template: `
    <button type="button" [class]="buttonClass()" (click)="open($event)" aria-haspopup="dialog">
      {{ label() }}
    </button>
    @if (isOpen()) {
      <dialog
        #dialog
        class="download-dialog"
        aria-labelledby="download-title"
        aria-describedby="download-description"
        (click)="onDialogClick($event)"
        (cancel)="onCancel($event)">
        <button #closeButton class="download-close" type="button" aria-label="Close" (click)="close()">×</button>
        <div class="eyebrow">Take Aira with you</div>
        <h2 id="download-title">Book with the Aira app</h2>
        <p id="download-description">Choose your device to get started.</p>
        <div class="download-options">
          <a class="download-option" [href]="googlePlayUrl" target="_blank" rel="noopener noreferrer">
            <span class="download-platform">ANDROID</span>
            <strong>Download on Google Play</strong>
            <span class="download-status">Available now <span aria-hidden="true">↗</span></span>
          </a>
          <div class="download-option unavailable" aria-label="iOS app, coming soon">
            <span class="download-platform">iOS</span>
            <strong>Aira for iPhone</strong>
            <span class="download-status">Coming soon</span>
          </div>
        </div>
        <button class="download-dismiss" type="button" (click)="close()">Maybe later</button>
      </dialog>
    }
  `,
})
export class AppDownloadButton {
  readonly label = input('Book an Appointment ↗');
  readonly buttonClass = input('button primary');
  readonly googlePlayUrl = GOOGLE_PLAY_URL;
  readonly isOpen = signal(false);
  readonly dismissed = output<void>();

  @ViewChild('dialog') private dialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('closeButton') private closeButton?: ElementRef<HTMLButtonElement>;
  private trigger?: HTMLButtonElement;

  open(event: MouseEvent) {
    if (event.currentTarget instanceof HTMLButtonElement) {
      this.trigger = event.currentTarget;
    }
    this.isOpen.set(true);
    setTimeout(() => {
      const dialog = this.dialog?.nativeElement;
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
      this.closeButton?.nativeElement.focus();
    });
  }

  close() {
    if (!this.isOpen()) {
      return;
    }
    if (this.dialog?.nativeElement.open) {
      this.dialog.nativeElement.close();
    }
    this.isOpen.set(false);
    this.dismissed.emit();
    const trigger = this.trigger;
    queueMicrotask(() => trigger?.focus());
  }

  onDialogClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.close();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen()) {
      this.close();
    }
  }
}
