import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClassTypesEnum } from '../models/class-types.enum'
import { TravelTypesEnum } from '../models/travel-types.enum';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  classTypes = Object.values(ClassTypesEnum).map(value => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'), value
  }));
  flightForm!: FormGroup;
  today = new Date();
  // TODO
  // travelTypes=

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.flightForm = this.fb.group({
      //TODO add passengers
      travelType: [TravelTypesEnum.OneWay],
      departureDate: [this.today],
      returnDate: [{ value: null, disabled: true }, [Validators.required]],
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      classType: [null],
    });
    this.setTravelTypeListener();
  }


  private setTravelTypeListener() {
    const returnDateCtrl = this.flightForm.get('returnDate');
    this.flightForm.get('travelType')?.valueChanges.subscribe(travelType => {
      if (travelType) {
        returnDateCtrl?.enable();
        return;
      }

      // TODO add test
      returnDateCtrl?.disable();
    });
  }

  submit() {
    //TODO should check form is valid then go to result page
    
  }
}
