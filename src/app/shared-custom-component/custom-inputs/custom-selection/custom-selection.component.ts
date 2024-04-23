import { LocalizationModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectionItemI } from './models';

@Component({
  selector: 'custom-selection',
  templateUrl: './custom-selection.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LocalizationModule],
})
export class CustomSelectionComponent {
  @Input('control') formControl: FormControl<any>;
  @Input({ required: true }) items: SelectionItemI[];
  @Input() label: string;
  @Input() required: boolean = true;
  // @Input() selectedItemValue?: string | boolean;

  @Output() change: EventEmitter<string | null> = new EventEmitter<string | null>();

  readonly selectOneStr = 'یک مقدار را انتخاب کنید';
  constructor() {}

  ngOnInit(): void {
    this.items = [{ title: this.selectOneStr, value: null }, ...this.items];
    this.formControl.valueChanges.subscribe(value => {
      if (value === 'null') {
        this.formControl.setValue(null, { emitEvent: false });
        this.change.emit(null);
      } else {
        this.change.emit(value);
      }
    });
  }
}
