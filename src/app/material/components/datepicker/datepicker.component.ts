import {
  Component
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgForm
} from '@angular/forms';
import {
  ErrorStateMatcher,
  MAT_DATE_FORMATS
} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BaseDatepickerComponent } from 'src/app/core/constant/base-component/base-date-picker';
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
    debugger
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
export class DatepickerComponent extends BaseDatepickerComponent {

  matcher = new MyErrorStateMatcher();

  onDateValueChanged(event:MatDatepickerInputEvent<any,any>){
    super.dateValueChanged(event.value);
  }
}
