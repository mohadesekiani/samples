import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import { IRangeTime } from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-time-range',
  templateUrl: './time-range.component.html',
  styleUrls: ['./time-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TimeRangeComponent,
    },
  ],
})
export class TimeRangeComponent extends BaseFormControlValueAccessor<IRangeTime> {
  constructor() {
    super();
  }

  override createForm() {
    super.createForm({
      startTime: [300, [Validators.required]],
      endTime: [1320, [Validators.required]],
    });
  }

  formatTime(timeValue: number) {
    const hours = Math.floor(timeValue / 60);
    const minutes = timeValue % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}`;
    return formattedTime;
  }
}
