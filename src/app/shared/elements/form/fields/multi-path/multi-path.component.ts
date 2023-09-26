import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import {
  IForm,
  ISearchMultiPath,
  ISearchRoute,
} from 'src/app/models/search-types.interface';
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
  private _travelType: TravelTypesEnum = TravelTypesEnum.OneWay;
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

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: any): void {
    this.travelTypeChangesUpdate(changes);
  }

  onChange = (value: any) => {};

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

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group<IForm<ISearchMultiPath>>({
      // TODO remove me
      routes: this.fb.array(
        [
          this.fb.group<IForm<ISearchRoute>>({
            origin: [null, [Validators.required]],
            destination: [null, [Validators.required]],
            //TODO  add custom validator greater than today value
            departureDate: [null, [Validators.required]],
            //TODO  add custom validator greater than departureDate value
            returnDate: [
              { value: null, disabled: true },
              [Validators.required],
            ],
          }),
        ],
        [Validators.required]
      ),
    });

    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      this.onChange(this.form.value);
      this.onTouched();
    });
    this.addNewRow();
    this.onTravelTypeChange();
  }

  addNewRow() {
    const newRow = this.fb.group<IForm<ISearchRoute>>({
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      //TODO  add custom validator greater than prev departureDate value
      departureDate: [null, [Validators.required]],
    });

    this.routes.push(newRow);
  }

  routeIsActive(index: number) {
    return this.routes.at(index).enabled;
  }

  isMultiPath() {
    return this._travelType === TravelTypesEnum.MultiPath;
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

  private isRoundTrip() {
    return this._travelType === TravelTypesEnum.RoundTrip;
  }

  private travelTypeChangesUpdate(changes: any) {
    if (changes.travelType) {
      this._travelType = this.travelType;
      this.onTravelTypeChange();
    }
  }
}
