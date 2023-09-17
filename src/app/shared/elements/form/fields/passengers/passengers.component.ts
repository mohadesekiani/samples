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
import { CustomValidators } from 'src/app/core/validations/passenger.validation';
import { IForm, ISearchPassenger } from 'src/app/models/search-types.interface';

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
export class PassengersComponent implements ControlValueAccessor {
  errorMessage!: { actual: number; max: number };
  hasError: boolean = false;
  form!: FormGroup; // <IForm<ISearchPassenger>>;
  buttonText: string = '+';
  disabled = false;
  touched = false;
  showDrop = false;
  //rename
  passenger: Array<any> = [
    { value: 0, name: 'Adult' },
    { value: 0, name: 'Child' },
    { value: 0, name: 'Infant' },
  ];

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
    return item == 'Infant' && this.form.controls['Infant'].hasError('max');
  }

  constructor(
    // @Self()
    // @Optional()
    // private ngControl: NgControl,
    private fb: FormBuilder,
    @Optional() @Host() public parent: ControlContainer
  ) {}

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
      .subscribe((x) => {
        this.refersValue();
      });
  }

  onChange = (value) => {};

  onTouched = () => {};

  writeValue(obj: any): void {
    this.form.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  refersValue() {
    if (this.form.valid) this.onChange(this.form.value);
    this.markAsTouched();
  }

  toggleDropDown() {
    if (this.showDrop) this.syncInnerFormAndControl();

    this.showDrop = !this.showDrop;
  }

  syncInnerFormAndControl() {
    debugger;
    let oldValue = this.parent?.['form']?.get('passengers')?.value;

    // form.get('passengers').value;
    this.form.patchValue(oldValue);
  }
}
