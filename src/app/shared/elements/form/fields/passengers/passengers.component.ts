import { Component } from '@angular/core';
import {
  AbstractControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { PassengerTypesEnum } from 'src/app/core/module/enum/general-types.enum';
import { CustomValidators } from 'src/app/core/validations/custom.validators';

import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import {
  ISearchPassenger
} from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PassengersComponent,
    },
  ],
})
export class PassengersComponent extends BaseFormControlValueAccessor<ISearchPassenger> {
  showDrop = false;
  passengers = Object.values(PassengerTypesEnum).map((value) => ({
    name: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value:0,
  }));
  oldValue!: ISearchPassenger;

  constructor() {
    super();
  }

  getInfantError(item: string) {
    return (
      item == PassengerTypesEnum.Infant &&
      this.form.controls.Infant.hasError('max')
    );
  }

  override createForm() {
    super.createForm({
      Adult: [null, [Validators.required]],
      Child: [null,this.validation()],
      Infant: [null],
    },[
      CustomValidators.maxFrom('Infant', 'Adult'),
      Validators.required,
    ]); 
  }

  validation(): any {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!control.value){
        return null;
      }

      if(control.value<3){
        return null;
      }

      return {
        maxInfant:{actual:control.value,expected:2}
      }
    }
  }

  toggleDropDown() {
    if (this.showDrop) this.syncInnerFormAndControl();
    this.showDrop = !this.showDrop;
  }

  syncInnerFormAndControl() {
    this.form.patchValue(this.oldValue);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  private oldValueValid(x: ISearchPassenger) {
    if (this.form.valid) this.oldValue = x;
  }
}
