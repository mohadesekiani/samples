import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
} from '@angular/forms';
import {
  ErrorStateMatcher,
  MAT_DATE_FORMATS,
  ShowOnDirtyErrorStateMatcher,
  _getOptionScrollPosition,
} from '@angular/material/core';
import { BaseInputControlValueAccessor } from 'src/app/core/constance/base-component/base-input-control-value-accessor';
import {
  IForm,
  ISearchRoute,
} from 'src/app/core/module/interface/search-types.interface';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const routes = form?.form.controls['routes'] as FormArray<
      FormGroup<IForm<ISearchRoute>>
    >;

    const route = routes.at(0);
    const ctrl = route.controls.departureDate;

    return !!(ctrl?.touched && ctrl.errors);
  }
}

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
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class DatepickerComponent extends BaseInputControlValueAccessor<Date> {
  @Input() label!: string;
  @Input() min = new Date();
  @Input() max = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  @Input() validationErrorMessage!: any;
  @Output() valueChange = new EventEmitter();
  dateValueChanged(value: Date): void {
    // iran time zone offset is  210
    // var d = new Date(value);
    // let numericDate = d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    // const date = new Date(numericDate);
    // this.value = date;
    this.value = value;
    this.updateValue();
  }
  matcher = new MyErrorStateMatcher();

  private updateValue() {
    this.updateValueAndValidity(this.value);
    super.messageError('departureDate');
    this.valueChange.emit(this.value);
  }
}
