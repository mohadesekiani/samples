import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'custom-text-area',
  templateUrl: './custom-text-area.component.html',
  standalone: true,
  imports: [CommonModule, LocalizationModule, ReactiveFormsModule],
})
export class CustomTextAreaComponent implements OnInit {
  @Input('control') formControl: FormControl<string>;
  @Input({ required: true }) label: string;
  @Input() required: boolean = false;
  @Input() placeholder?: string;
  @Input() minHeight?: string = null;
  @Input() maxlength?: string = null;

  constructor() {}

  ngOnInit() {}
}
