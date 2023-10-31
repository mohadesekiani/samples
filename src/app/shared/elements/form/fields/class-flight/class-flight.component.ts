import { Component, Input } from '@angular/core';
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
  // @Input() baseFormConfig!: IForm<IClassFlight>;
  private _baseFormConfig!: IForm<IClassFlight>;
   _classesTypesFlight!:any

  @Input() get baseFormConfig(): IForm<IClassFlight> {
    return this._baseFormConfig;
  }
  set baseFormConfig(value: IForm<IClassFlight>) {
    this._baseFormConfig = value;
  }


  @Input() get classesTypesFlight(){
    return this._classesTypesFlight;
  }
  set classesTypesFlight(value) {
    this._classesTypesFlight= value;
  }


  get classesFormArray() {
    return this.form.controls.classes as FormArray;
  }

  constructor() {
    super();
  }

  override createForm() {
    super.createForm(this._baseFormConfig);
    this.addCheckboxesToForm();
  }

  changeCheckBox(e: Event, i: any) {
    const target = e.target as HTMLInputElement;
    this.classesFormArray.at(i).setValue(target.checked ? target.value : false);
  }

  private addCheckboxesToForm() {
    this._classesTypesFlight.forEach(() =>
      this.classesFormArray.push(this.fb.control(false))
    );
  }
}
