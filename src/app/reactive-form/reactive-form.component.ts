import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent {
  options: string[] = ['First', 'Besuness', 'Economy', 'Primum'];
  cityForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {
    this.cityForm = this.fb.group({
      cityInput: new FormControl(null, [Validators.required]),
      departureDate: new FormControl(null),
      returnDate: new FormControl(null),
      origin: new FormControl(null, [Validators.required]),
      destination: new FormControl(null, [Validators.required]),
      radio: new FormControl(null),
    });
  }
  // aaa() {
  //   this.cityForm.disable();
  // }
}
