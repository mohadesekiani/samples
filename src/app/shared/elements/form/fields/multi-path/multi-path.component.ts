import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-multi-path',
  templateUrl: './multi-path.component.html',
  styleUrls: ['./multi-path.component.scss'],
})
export class MultiPathComponent implements OnInit {
  items!: FormArray;
  reactiveForm = new FormGroup({
    name: new FormControl(''),
    delAddress: new FormArray([]),
  });
  ngOnInit(): void {
    this.addNewRow();
  }
  addNewRow() {
    this.items = this.reactiveForm.get('delAddress') as FormArray;
    this.items.push(this.genRow());
  }

  get delAddress() {
    return this.reactiveForm.get('delAddress') as FormArray;
  }

  genRow(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      name2: new FormControl(''),
    });
  }

  submit() {}
}
