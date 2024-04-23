import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'custom-num-input',
  templateUrl: './custom-num-input.component.html',
  styleUrls: ['./custom-num-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizationModule],
})
export class CustomNumInputComponent implements OnInit {
  @Input('control') formControl: FormControl<string>;
  @Input() placeholder: string = null;
  @Input() label: string = null;
  @Input() minlength: number | null = null;
  @Input() maxlength: number | null = null;
  @Input() required: boolean = false;
  @Input() absoluteLength?: number;
  @Input() spaceTrim: boolean = false;

  constructor() {}

  ngOnInit() {
    this.addNumberValidator();

    if (this.absoluteLength)
      this.formControl.addValidators([this.absoluteLengthValidator(this.absoluteLength)]);

    if (this.spaceTrim)
      this.formControl.setValidators([this.spaceTrimValidator(), this.formControl.validator]);
  }
  get requiredValidator() {
    return this.formControl.hasValidator(Validators.required);
  }

  private absoluteLengthValidator(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value?.toString(); // Convert the value to string
      if (!value || value?.length === length) {
        return null; // Validation passes if the length matches
      } else {
        return { absoluteLength: { requiredLength: length, actualLength: value.length } };
      }
    };
  }

  private addNumberValidator() {
    this.formControl.setValidators(Validators.pattern(/^\d+$/));
  }

  private spaceTrimValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && typeof control.value === 'string') {
        const trimmedValue = control.value.trim();
        // Check if the value has changed before setting it to avoid recursion
        if (control.value !== trimmedValue) {
          control.setValue(trimmedValue, { emitEvent: false }); // Set the trimmed value without emitting an event
        }
        return null;
      }
      return null;
    };
  }
}
