import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassTypesEnum } from '../models/class-types.enum';
import { TravelTypesEnum } from '../models/travel-types.enum';
import { Router } from '@angular/router';
import { distinctUntilChanged, skip, startWith } from 'rxjs';
export type IForm<T> = {
  [K in keyof T]?: any;
}
export interface ISearchFlight {
  passengers: any;
  travelType: any;
  departureDate: any;
  returnDate: any;
  origin: any;
  destination: any;
  classType: any;
}

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
  // travelTypes
  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));
  showDrop = false;

  passenger: Array<any> = [
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Child' },
    { value: 0, name: 'Infant' },
  ];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.setTravelTypeListener();
  }

  private formCreator() {
    // const passengerData = this.passengerForm.getRawValue().passengers;
    return this.fb.group<IForm<ISearchFlight>>({
      passengers: [null],
      travelType: [TravelTypesEnum.OneWay],
      departureDate: [this.today],
      returnDate: [{ value: null, disabled: true }, [Validators.required]],
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      classType: [null],
    });
  }

  // childrenCountValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     let infantValue = control.value;
  //     let adultValue = this.flightForm?.controls["passengers"].value["Adult"]
  //     if (infantValue > adultValue) {
  //       return { max: { actual: infantValue, max: adultValue } };
  //     }
  //     return null;
  //   };
  // }

  private setTravelTypeListener() {
    const returnDateCtrl = this.flightForm.controls.returnDate;
    this.flightForm
      .get('travelType')
      ?.valueChanges.pipe(
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
      this.router.navigate(['/Train']);
    } else {
      alert('فرم ثبت نشد');
    }
  }
}
