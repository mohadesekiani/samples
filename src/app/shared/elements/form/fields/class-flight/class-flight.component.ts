import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import { ClassTypesEnum } from 'src/app/core/module/enum/class-types.enum';
import { ClassesTypesFlightEnum } from 'src/app/core/module/enum/general-types.enum';
import {
  IClassFlight,
  IForm,
} from 'src/app/core/module/interface/search-types.interface';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-class-flight',
  templateUrl: './class-flight.component.html',
  styleUrls: ['./class-flight.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClassFlightComponent,
      multi: true,
    },
  ],
})
export class ClassFlightComponent extends BaseFormControlValueAccessor<IClassFlight> {
  classesTypesFlight = Object.values(ClassesTypesFlightEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  get classesFormArray() {
    return this.form.controls.classes as FormArray;
  }
  constructor() {
    super();
  }

  override createForm() {
    const baseFormConfig: IForm<IClassFlight> = {
      classes: this.fb.array([]),
    };
    super.createForm(baseFormConfig);
    this.addCheckboxesToForm();
  }
  changeCheckBox(e: Event, i: any) {    
    const target = e.target as HTMLInputElement;
    this.classesFormArray.at(i).setValue(target.checked ? target.value : false);
  }

  private addCheckboxesToForm() {
    this.classesTypesFlight.forEach(() =>
      this.classesFormArray.push(this.fb.control(false))
    );
  }
}
