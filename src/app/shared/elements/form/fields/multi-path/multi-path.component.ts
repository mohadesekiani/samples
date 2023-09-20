import { JsonPipe } from '@angular/common';
import {
  Component,
  INJECTOR,
  Inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { IForm, ISearchMultiPath } from 'src/app/models/search-types.interface';
import { TravelTypesEnum } from 'src/app/models/travel-types.enum';

@Component({
  selector: 'app-multi-path',
  templateUrl: './multi-path.component.html',
  styleUrls: ['./multi-path.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiPathComponent,
      multi: true,
    },
  ],
})
export class MultiPathComponent implements ControlValueAccessor {
  form!: FormGroup;
  touched = false;
  disabled = false;
  multiArray: any;
  @Input() item!: any;
  value!: [];

  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  onChange = (value) => {};

  onTouched = () => {};

  constructor(private fb: FormBuilder) {}

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

  ngOnInit(): void {
    this.formCreator();
    this.addNewRow();
  }

  formCreator() {
    this.form = this.fb.group<IForm<ISearchMultiPath>>({
      travelType: [TravelTypesEnum.OneWay],
      multiPath: this.fb.array([]),
    });

    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      this.onChange(this.form.value);
      this.onTouched();
      // this.multiArray = x;
    });
  }

  get multiPath() {
    return this.form.get('multiPath') as FormArray;
  }

  addNewRow() {
    const newRow = this.fb.group({
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      departureDate: [null],
      returnDate: [null],
    });
    this.multiPath.push(newRow);
  }
  travelTypesClick(selectedTravelType: string) {
    this.form.patchValue({
      travelType: selectedTravelType,
    });
    if (selectedTravelType === 'OneWay') {
      const multiPathArray = this.form.get('multiPath') as FormArray;
      while (multiPathArray.length > 1) {
        multiPathArray.removeAt(1);
      }
    }
  }
}
