import { Component, Host, Optional } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
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
import { BaseControlValueAccessorForm } from 'src/app/shared/base-component/base-control-value-accessor-form';

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
export class PassengersComponent extends BaseControlValueAccessorForm {
  errorMessage!: { actual: number; max: number };
  hasError = false;
  form!: FormGroup<IForm<ISearchPassenger>>;
  disabled = false;
  value: any
  buttonText = '+';
  touched = false;
  showDrop = false;
  //rename
  passengers: Array<any> = [
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Child' },
    { value: 0, name: 'Infant' },
  ];
  oldValue!: ISearchPassenger;

  //ontic without controlValueAccessor
  // onChildValueChange(newValue: number, item) {
  //   // ref.value = newValue;
  //   // this.passengers.value[item.name] = newValue;
  //   let ctrl = this.passengers.get(item.name);
  //   ctrl?.setValue(newValue);
  //   this.refersValue();
  // }

  // decrees(item) {
  //   let ctrl = this.form.get(item.name);
  //   if (ctrl?.value <= 0) {
  //     return;
  //   }
  //   ctrl?.setValue(ctrl.value - 1);
  //   this.refersValue();
  // }
  // increased(item) {
  //   let ctrl = this.form.get(item.name);
  //   ctrl?.setValue(ctrl.value + 1);
  //   this.refersValue();
  // }
  getInfantError(item: string) {
    return (
      item == PassengerTypesEnum.Infant &&
      this.form.controls.Infant.hasError('max')
    );
  }

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group<IForm<ISearchPassenger>>(
      {
        Adult: [null, [Validators.required]],
        Child: [null],
        Infant: [null],
      },
      {
        validators: [CustomValidators.maxFrom('Infant', 'Adult')],
      }
    );

    this.form.valueChanges
      .pipe(distinctUntilChanged((p, c) => isEqual(p, c)))
      .subscribe((x: any) => {
        this.refersValue();
        setTimeout(() => {
          this.oldValueValid(x);
        });
      });
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  refersValue() {
    if (this.form.valid) {
      this.onChange(this.form.value);
    } else {
      this.onChange(null);
    }
    this.markAsTouched();
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
