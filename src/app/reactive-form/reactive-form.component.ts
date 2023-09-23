import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassTypesEnum } from '../models/class-types.enum';
import { TravelTypesEnum } from '../models/travel-types.enum';
import { Router } from '@angular/router';
import { distinctUntilChanged, skip, startWith } from 'rxjs';
import { IForm, ISearchFlight } from '../models/search-types.interface';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  classTypes = Object.values(ClassTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  flightForm = this.formCreator();
  today = new Date();
  showDrop = false;
  passenger: Array<any> = [
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Child' },
    { value: 0, name: 'Infant' },
  ];

  // travelTypes
  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  get travelType(): TravelTypesEnum {
    return this.flightForm.controls.travelType?.value as any;
  }

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.setTravelTypeListener();
  }

  private formCreator() {
    return this.fb.group<IForm<ISearchFlight>>({
      passengers: [null, [Validators.required]],
      travelType: [TravelTypesEnum.OneWay],
      classType: [null],
      // departureDate: [this.today],
      // returnDate: [{ value: null, disabled: true }, [Validators.required]],
      // origin: [null, [Validators.required]],
      // destination: [null, [Validators.required]],
      routes: [null, [Validators.required]],
    });
  }

  private setTravelTypeListener() {
    const returnDateCtrl = this.flightForm.controls.returnDate;
    this.flightForm.controls.travelType?.valueChanges.pipe(
        startWith(TravelTypesEnum.OneWay),
        distinctUntilChanged(),
        skip(1)
      )
      .subscribe((travelType) => {
        if (travelType == TravelTypesEnum.RoundTrip) {
          returnDateCtrl?.enable();
          return;
        }
        returnDateCtrl?.disable();
      });
  }

  submit() {
    if (this.flightForm.valid) {
      this.router.navigate(['/results']);
    } else {
      alert('فرم ثبت نشد');
    }
  }
}
