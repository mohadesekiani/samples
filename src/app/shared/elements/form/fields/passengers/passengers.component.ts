import { Component } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

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
 
  
  onChildValueChange(newValue: number,input, item) {
    console.log(newValue);
    input.value = newValue;
    this.passengers.value[item.name] = newValue;
    console.log('be',this.passengers);
    
    this.passengers.valueChanges.subscribe((x) => {
      console.log('af',this.passengers);

      console.log(newValue);
      console.log(x);
      
      input.value = newValue;
      x.value[item.name] = newValue;

    })
    // console.log(this.passengers.value);
    
  }

  constructor(
    private fb: FormBuilder
  ) {
    // if (this.ngControl != null) {
    //   // Setting the value accessor directly (instead of using
    //   // the providers) to avoid running into a circular import.
    //   this.ngControl.valueAccessor = this;
    // }
  }
  ngOnInit() {
    this.createForm();

  }

  createForm() {
    this.passengers = this.fb.group<any>({
      adult: [null, [Validators.required]],
      child: [null],
      infant: [null, [this.childrenCountValidator()]],
    });
    this.passengers.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      this.refersValue();
      this.errorMasseage = this.passengers.get('infant')?.getError('max');
      console.log(this.passengers.value);
      
    });
  }

  childrenCountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let infantValue = control.value;
      let adultValue = this.passengers?.value['adult'];
      if (infantValue > adultValue) {
        return { max: { actual: infantValue, max: adultValue } };
      }
      return null;
    };
  }

  errorMasseage!: { actual: number; max: number };
  hasError: boolean = false;
  passengers!: FormGroup;
  buttonText :string ="+";
  disabled = false;
  touched = false;
  onChange = (value) => {
    value;
  };
  onTouched = () => {};

  writeValue(obj: any): void {}

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
  showDrop = false;
  //rename
  passenger: Array<any> = [
    { value: 0, name: 'adult' },
    { value: 0, name: 'child' },
    { value: 0, name: 'infant' },
  ];

  decrees(item) {
    if (item.value <= 0) {
      return;
    }

    item.value = item.value - 1;
  }

  refersValue() {
    //TODO if is empty or invalid return null
    this.onChange(this.passengers.value);
    this.markAsTouched();
  }
}
