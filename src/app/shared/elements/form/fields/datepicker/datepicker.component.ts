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
  // TODO should set by test
  @Input() min = new Date('2020/05/05');
  @Input() max = new Date('2020/05/10');
  @Input() value!: Date;
  @Output() valueChange = new EventEmitter();
  disabled = false;
  touched = false;
  // @ViewChild('picker') picker!: MatDatepicker<any> ;

  onChange = (value) => { };
  onTouched = () => { };

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
    if (this.min && this.value < this.min) {
      this.value = this.min;
      this.updateValue();
      return;
    }

    if (this.max && this.value > this.max) {
      this.value = this.max;
      this.updateValue();
      return;
    }

    this.updateValue();
  }

  private updateValue() {
    this.onChange(this.value);
    this.markAsTouched();
    this.valueChange.emit(this.value);
  }
}
