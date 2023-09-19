import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  // travelTypes
  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));
  showDrop = false;
  items!: FormArray;
  passenger: Array<any> = [
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Child' },
    { value: 0, name: 'Infant' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.setTravelTypeListener();
    // this.addNewRow();
  }

  private formCreator() {
    // const passengerData = this.passengerForm.getRawValue().passengers;
    return this.fb.group<IForm<ISearchFlight>>({
      passengers: [null, [Validators.required]],
      travelType: [TravelTypesEnum.OneWay],
      // departureDate: [this.today],
      // returnDate: [{ value: null, disabled: true }, [Validators.required]],
      // origin: [null, [Validators.required]],
      // destination: [null, [Validators.required]],
      classType: [null],
      // multiPath: this.fb.array([]),
      multiPaths: [null, [Validators.required]],

    });
  }
  // addNewRow() {
  //   const newRow = this.fb.group({
  //     origin: [null, [Validators.required]],
  //     destination: [null, [Validators.required]],
  //     departureDate: [null],
  //     returnDate: [null],
  //   });
  //   this.nn.push(newRow);
  // }

  // get nn() {
  //   return this.flightForm.get('multiPath') as FormArray;
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
