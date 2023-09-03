import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
 import { ClassTypesEnum  } from '../models/class-types.enum'
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent {
  //TODO fill option by ClassTypeEnum
  options:any = [];
  cityForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
    const optionEnum = ClassTypesEnum;
    this.options = Object.values(optionEnum).map(value => ({ title: value.replace(/([a-z])([A-Z])/g, '$1 $2'), value: value }));
  }
  private createForm() {
    this.cityForm = this.fb.group({
      cityInput: [null, [Validators.required]],
      departureDate: [null],
      returnDate: [new Date()],
      origin: [null, [Validators.required]],
      destination: new FormControl(null, [Validators.required]),
      classType: new FormControl(null),
    });
  }

}
