import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'custom-email-input',
  templateUrl: './custom-email-input.component.html',
  standalone: true,
  imports: [CommonModule, LocalizationModule, ReactiveFormsModule],
})
export class CustomEmailInputComponent implements OnInit {
  @Input('control') formControl: FormControl;
  @Input({ required: true }) label: string;
  @Input() placeholder?: string;
  @Input() required: boolean = false;
  constructor() {}

  get requiredValidator() {
    return this.formControl.hasValidator(Validators.required);
  }

  ngOnInit() {}
}
