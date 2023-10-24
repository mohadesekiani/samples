import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import {
  IForm,
  IRangeTime,
} from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-time-range',
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.scss'],
})
export class TimeRangeComponent extends BaseFormControlValueAccessor<IRangeTime> {
  override createForm() {
    super.createForm({
      startTime: ['05:30'],
      endTime: ['22:30'],
    });
  }

}
