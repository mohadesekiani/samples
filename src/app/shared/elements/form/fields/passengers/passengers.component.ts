import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
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
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';

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
  // errorMessage!: { actual: number; max: number };
  _result: any;

  // @Input() override get validationErrorMessage(): ValidationErrors | null {
  //   return this.validation.getFormValidationErrors(this.form);
  // }
  // override set validationErrorMessage(value) {
  //   this._result = value;
  // }

  errorTexts: any;
  hasError = false;
  buttonText = '+';
  showDrop = false;
  //rename
  passengers: Array<any> = [
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Child' },
    { value: 0, name: 'Infant' },
  ];
  oldValue!: ISearchPassenger;
  getInfantError(item: string) {
    return (
      item == PassengerTypesEnum.Infant &&
      this.form.controls.Infant.hasError('max')
    );
  }

  constructor(fb: FormBuilder, validation: ValidationErrorService) {
    super(fb, validation);
  }
  // errMes(x:any){
  //    this.errorTexts = this.errorMessage.getErrorMessage(x)

  // }

  override createForm() {
    super.createForm({
      Adult: [null, [Validators.required]],
      Child: [null,this.validation()],
      Infant: [null],
    },[
      CustomValidators.maxFrom('Infant', 'Adult'),
      Validators.required,
    ]);
    // this.vService.addCustomErrorValidator('Child', this.validation());



    // this.form.valueChanges
    //   .pipe(distinctUntilChanged((p, c) => isEqual(p, c)))
    //   .subscribe((x: any) => {
    //     this.refersValue();
    //     setTimeout(() => {
    //       this.oldValueValid(x);
    //     });
    //   });

    
  }

  // Infant should be set 20 not 1100
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
