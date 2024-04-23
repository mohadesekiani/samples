import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'custom-price-input',
  template: `
    <div class="form-group mb-2">
      <label [for]="formControl">
        <span *ngIf="required || requiredValidator">*</span> <span>{{ label }}</span>
      </label>
      <input
        type="number"
        class="form-control text-right"
        [ngClass]="{ readonly: readonly === true }"
        [id]="formControl"
        [formControl]="formControl"
        [readonly]="readonly"
        [required]="required"
      />
    </div>
    <!-- error handling-->
    <ng-container *ngIf="formControl.touched || formControl.dirty">
      <div *ngIf="formControl.errors?.required" class="text-danger my-1">
        {{ '::FieldRequired' | abpLocalization }}
      </div>
    </ng-container>

    <ng-container *ngIf="formControl?.value">
      <div *ngIf="formControl?.value <= 0" class="text-danger my-1">
        {{ '::TheAmountIsNotAllowed' | abpLocalization }}
      </div>
      <!-- error handling-->
      <ng-content />
    </ng-container>
  `,
  styleUrls: ['./custom-price-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizationModule],
})
export class CustomPriceInputComponent {
  @Input('control') formControl: FormControl;
  @Input() placeholder: string = null;
  @Input() label: string = null;
  @Input() readonly: boolean = false;
  @Input() required: boolean = true;

  get requiredValidator() {
    return this.formControl.hasValidator(Validators.required);
  }
}
