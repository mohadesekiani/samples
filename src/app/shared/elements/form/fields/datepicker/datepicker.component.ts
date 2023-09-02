import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DatepickerComponent,
    },
  ],
})
export class DatepickerComponent implements ControlValueAccessor {
  [x: string]: any;
  @Input() label!: string;
  @Input() min!: Date;
  @Input() max!: Date;
  @Input() value!: Date;
  // TODO  [(value)]="value"
  // @Output() valueChange = new EventEmitter();
  disabled = false;
  touched = false;
  // @ViewChild('picker') picker!: MatDatepicker<any> ;

  onChange = (value) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (this.touched) {
      return;
    }

    this.onTouched();
    this.touched = true;
  }

  dateValueChanged(value: Date) {
    this.value = value;
    // check is between min and max
    if (this.value < new Date('2020/05/05')) {
      this.value = new Date('2020/05/05');
      this.onChange(this.value);
    }
    if (this.value > new Date('2020/05/10')) {
      this.value = new Date('2020/05/10');
      this.onChange(this.value);
    }
    this.markAsTouched();
  }
}
