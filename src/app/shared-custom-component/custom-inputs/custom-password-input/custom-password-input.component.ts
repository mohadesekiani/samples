import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'custom-password-input',
  templateUrl: './custom-password-input.component.html',
  styleUrls: ['./custom-password-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizationModule],
})
export class CustomPasswordInputComponent implements OnInit {
  @Input('control') formControl: FormControl;
  @Input() placeholder: string = null;
  @Input() label: string = null;
  @Input() minlength: number | null = null;
  @Input() maxlength: number | null = null;
  @Input() required: boolean = false;
  @Input() toggleIcon: boolean = true;

  type: 'password' | 'text' = 'password';

  constructor() {}

  ngOnInit() {}

  get requiredValidator() {
    return this.formControl.hasValidator(Validators.required);
  }
  toggleType() {
    if (this.type === 'password') this.type = 'text';
    else this.type = 'password';
  }
}
