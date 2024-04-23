import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  template: `<button class="btn btn-primary m-2" [disabled]="isDisabled()" (click)="submit()">
    <span
      *ngIf="isLoading"
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
    <span *ngIf="!isLoading">خرید</span>
  </button> `,
})
export class LoadingButtonComponent {
  @Input() disabledButton: boolean;
  @Input() isLoading: boolean;
  @Output() submitClicked: EventEmitter<void> = new EventEmitter<void>();

  isDisabled() {
    return this.disabledButton || this.isLoading;
  }

  submit() {
    this.submitClicked.emit();
  }
}
