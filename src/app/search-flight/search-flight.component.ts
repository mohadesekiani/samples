import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassTypesEnum } from 'src/app/core/module/enum/class-types.enum'
import { TravelTypesEnum } from 'src/app/core/module/enum/travel-types.enum'
import { Router } from '@angular/router';
import { IForm, ISearchFlight } from 'src/app/core/module/interface/search-types.interface'

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent {
  classTypes = Object.values(ClassTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  flightForm = this.createForm();
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
    return this.flightForm.controls.travelType?.value as TravelTypesEnum;
  }

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // this.flightForm.controls.travelType?.valueChanges.subscribe((x) => {
    //   this.flightForm.controls.travelType?.patchValue(x)
    // });
  }

  private createForm() {
    return this.fb.group<IForm<ISearchFlight>>({
      passengers: [null, [Validators.required]],
      travelType: [TravelTypesEnum.OneWay],
      classType: [null],
      routes: [null, [Validators.required]],
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
