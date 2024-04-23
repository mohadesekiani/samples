import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbCalendarPersian,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18nPersian } from './ngb-date-picker-i18-n-persian.service';
import { map } from 'rxjs';
import { LocalizationModule } from '@abp/ng.core';

@Component({
  selector: 'ngb-persian-datepicker',
  templateUrl: './ngb-persian-date-picker.component.html',
  styleUrls: ['./ngb-persian-date-picker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgbDatepickerModule,
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    LocalizationModule,
  ],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
  ],
})
export class CustomDatePicker2Component implements OnInit {
  @Input('control') formControl: FormControl;
  @Input() label: string;
  @Input() required: boolean = true;

  today = inject(NgbCalendar).getToday();
  model: NgbDateStruct;
  date: { year: number; month: number };

  constructor() {}

  ngOnInit() {
    this.formControl.valueChanges
      .pipe(
        map((value: string) => {
          // Assuming value format is "1402/01/01"
          const changedStr = value.replace(/\//g, '-');
          return changedStr; // Return as is if format doesn't match
        })
      )
      .subscribe((newValue: string) => {
        this.formControl.setValue(newValue, { emitEvent: false }); // Set the transformed value without emitting the event to prevent infinite loop
      });
  }

  clicked() {
    this.formControl.markAsTouched();
  }
}
