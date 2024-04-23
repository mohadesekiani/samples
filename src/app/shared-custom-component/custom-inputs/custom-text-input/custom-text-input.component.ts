import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'custom-text-input',
  templateUrl: './custom-text-input.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizationModule],
})
export class CustomTextInputComponent implements OnInit {
  @Input('control') formControl: FormControl;
  @Input() placeholder: string = null;
  @Input() label: string = null;
  @Input() minlength: number | null = null;
  @Input() maxlength: number | null = null;
  @Input() required: boolean = false;
  @Input() latin: boolean = false;

  constructor() {}

  ngOnInit() {
    if (this.latin) {
      this.formControl.addValidators(this.latinCharactersValidator());
    }
  }
  get requiredValidator() {
    return this.formControl.hasValidator(Validators.required);
  }

  private latinCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const latinRegex = /^[a-zA-Z\s]*$/;
      const isValid = latinRegex.test(control.value);
      return isValid ? null : { latinCharacters: true };
    };
  }
}
