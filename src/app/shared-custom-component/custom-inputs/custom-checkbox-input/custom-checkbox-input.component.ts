import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'custom-checkbox-input',
  templateUrl: './custom-checkbox-input.component.html',
  standalone: true,
  imports: [CommonModule, LocalizationModule, ReactiveFormsModule],
})
export class CustomCheckboxInputComponent implements OnInit {
  @Input('control') formControl: FormControl<boolean>;
  @Input({ required: true }) label: string;
  @Input() checked: boolean = false;

  constructor() {}

  ngOnInit() {}
}
