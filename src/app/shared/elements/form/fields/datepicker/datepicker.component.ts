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
  @Input() label!: string;
  @Input() min = new Date();
  @Input() max = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());

  // new Date('2020/05/10');
  @Input() value!: Date;
  @Output() valueChange = new EventEmitter();
  disabled = false;
  touched = false;
  // @ViewChild('picker') picker!: MatDatepicker<any> ;

  onChange = (value:any) => { };
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
