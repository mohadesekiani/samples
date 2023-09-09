import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ClassTypesEnum } from '../models/class-types.enum';
import { TravelTypesEnum } from '../models/travel-types.enum';
import { Router } from '@angular/router';
import { distinctUntilChanged, skip, startWith } from 'rxjs';

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
  flightForm: FormGroup = this.formCreator();
  today = new Date();
  // TODO* travelTypes
  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));
  showDrop = false;

  passenger: Array<any> = [
    { value: 0, name: 'adult' },
    { value: 0, name: 'child' },
    { value: 0, name: 'infant' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.setTravelTypeListener();
    }

  private formCreator() {
    // const passengerData = this.passengerForm.getRawValue().passengers;
    return this.fb.group<any>(
      {
        passengers: [null,Validators.required],
        travelType: [TravelTypesEnum.OneWay],
        departureDate: [this.today],
        returnDate: [{ value: null, disabled: true }, [Validators.required]],
        origin: [null, [Validators.required]],
        destination: [null, [Validators.required]],
        classType: [null],
      },
    );
  }

  childrenCountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => { 
      let infantValue = control.value;
      let adultValue =this.flightForm?.controls["passengers"].value["adult"] 
      if (infantValue > adultValue) {
        return { max: { actual:infantValue, max: adultValue} };
      }
      return null;
    };
  }

  private setTravelTypeListener() {
    const returnDateCtrl = this.flightForm.get('returnDate');
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
