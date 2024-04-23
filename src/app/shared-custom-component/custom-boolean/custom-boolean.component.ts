import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'custom-boolean',
  templateUrl: './custom-boolean.component.html',
  standalone: true,
  imports: [CommonModule, LocalizationModule],
})
export class CustomBooleanComponent implements OnInit {
  @Input({ required: true }) bool: boolean | 'بله' | 'خیر';
  @Input() cusClass: string;
  @Input() outputType: 'text' | 'icon' = 'text';

  constructor() {}

  ngOnInit() {
    if (this.bool === 'بله') this.bool = true;
    else if (this.bool === 'خیر') this.bool = false;
  }
}
