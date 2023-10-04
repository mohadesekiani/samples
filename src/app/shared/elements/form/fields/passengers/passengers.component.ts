import { Component, Host, Optional } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { isEqual } from 'lodash-es';
import { distinctUntilChanged } from 'rxjs';
import { CustomValidators } from 'src/app/core/validations/custom.validators';
import { PassengerTypesEnum } from 'src/app/models/general-types.enum';
import { IForm, ISearchPassenger } from 'src/app/models/search-types.interface';
import { BaseFormControlValueAccessor } from 'src/app/shared/base-component/base-form-control-value-accessor';

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
  errorMessage!: { actual: number; max: number };
  hasError = false;
  // form!: FormGroup<IForm<ISearchPassenger>>;
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

  constructor(fb: FormBuilder) {
    super(fb);
  }


  override createForm() {
    super.createForm({
      Adult: [null, [Validators.required]],
      Child: [null],
      Infant: [null],
    });

    this.form.setValidators(CustomValidators.maxFrom('Infant', 'Adult'));
    // this.form.valueChanges
    //   .pipe(distinctUntilChanged((p, c) => isEqual(p, c)))
    //   .subscribe((x: any) => {
    //     this.refersValue();
    //     setTimeout(() => {
    //       this.oldValueValid(x);
    //     });
    //   });
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
