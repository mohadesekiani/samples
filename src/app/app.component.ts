import { Component } from '@angular/core';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sample';

  // cityForm: FormGroup = new FormGroup({});

  // constructor(private fb: FormBuilder) {
  //   this.cityForm = this.fb.group({
  //     cityInput: new FormControl(null, [Validators.required]),
  //     datepicker: new FormControl(null),
  //     myInput: new FormControl(null, [Validators.required]),
  //   });
  // }
  // aaa() {
  //   this.cityForm.disable();
  // }
}
