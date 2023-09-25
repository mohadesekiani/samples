import { Component, Input } from '@angular/core';
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
  private _travelType = TravelTypesEnum.OneWay;
  travelTypesEnum = TravelTypesEnum;
  @Input() get travelType(): TravelTypesEnum {
    return this._travelType;
  }
  set travelType(value: TravelTypesEnum) {
    this._travelType = value;
  }
  form!: FormGroup<IForm<ISearchMultiPath>>;
  touched = false;
  disabled = false;
  value!: [];

  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  get routes() {
    // TODO add my interface
    return this.form.controls.routes as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  onChange = (value) => { };

  onTouched = () => { };

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
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group<IForm<ISearchMultiPath>>({
      // TODO remove me
      travelType: [TravelTypesEnum.OneWay],
      routes: this.fb.array(
        [
          this.fb.group({
            origin: [null, [Validators.required]],
            destination: [null, [Validators.required]],
            //TODO  add custom validator greater than today value
            departureDate: [null, [Validators.required]],
            //TODO  add custom validator greater than departureDate value
            returnDate: [{ value: null, disabled: true }, [Validators.required]],
          }),
        ],
        [Validators.required]
      ),
    });

    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      this.onChange(this.form.value);
      this.onTouched();
    });

    this.form.controls.travelType?.valueChanges.subscribe((travelType) => {
      this._travelType = travelType;
      this.onTravelTypeChange();
    });

    this.addNewRow();
    this.onTravelTypeChange();
  }

  addNewRow() {
    const newRow = this.fb.group({
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      //TODO  add custom validator greater than prev departureDate value
      departureDate: [null, [Validators.required]]
    });

    this.routes.push(newRow);
  }

  private onTravelTypeChange() {
    this.prepareReturnDateState();

    this.prepareMultiPathControlsState();
  }

  private prepareMultiPathControlsState() {
    if (this._travelType !== TravelTypesEnum.MultiPath) {
      this.routes.controls.slice(1).forEach((x) => {
        x.disable();
      });

      return;
    }

    this.routes.controls.slice(1).forEach((x) => {
      x.enable();
    });
  }

  private prepareReturnDateState() {
    if (!this.isRoundTrip()) {
      this.routes.at(0).get('returnDate')?.disable();
      return;
    }

    this.routes.at(0).get('returnDate')?.enable();
  }

  routeIsActive(index: number) {
    return this.routes.at(index).enabled;
  }

  isMultiPath() {
    return this._travelType === TravelTypesEnum.MultiPath;
  }

  isRoundTrip() {
    console.log('isRoundTrip')
    return this._travelType === TravelTypesEnum.RoundTrip;
  }
}
