import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { CustomValidators } from 'src/app/core/validations/custom.validators';
import {
  IForm,
  ISearchMultiPath,
  ISearchRoute,
} from 'src/app/models/search-types.interface';
import { TravelTypesEnum } from 'src/app/models/travel-types.enum';
import { BaseFormControlValueAccessor } from 'src/app/shared/base-component/base-form-control-value-accessor';

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
export class MultiPathComponent extends BaseFormControlValueAccessor<ISearchMultiPath> {
  baseFormConfig!: FormGroup<IForm<ISearchMultiPath>>;
  private _travelType: TravelTypesEnum = TravelTypesEnum.OneWay;
  travelTypesEnum = TravelTypesEnum;
  //TODO read about getter setter @Input and about pass value between component
  @Input() get travelType(): TravelTypesEnum {
    return this._travelType;
  }
  set travelType(value: TravelTypesEnum) {
    this._travelType = value;
    if (this.form) this.onTravelTypeChange();
  }
  // form!: FormGroup<IForm<ISearchMultiPath>>;
  touched = false;
  disabled = false;
  value!: [];

  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  get routes() {
    return this.form.controls.routes as FormArray<
      FormGroup<IForm<ISearchRoute>>
    >;

  }

  constructor(fb: FormBuilder) {
    super(fb);
  }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    const baseFormConfig:IForm<ISearchMultiPath>= {
      routes: this.fb.array<FormGroup<IForm<ISearchRoute>>>(
        [
          this.fb.group<IForm<ISearchRoute>>({
            origin: [null, [Validators.required]],
            destination: [null, [Validators.required]],
            departureDate: [
              null,
              [Validators.required, CustomValidators.dateValidator()],
            ],
            returnDate: [
              { value: null, disabled: true },
              [
                Validators.required,
                CustomValidators.returnDateValidator('routes'),
              ],
            ],
          }),
        ],
        [Validators.required]
      ),
    };
    this.createBaseForm(baseFormConfig);
    this.addNewRow();
    this.onTravelTypeChange();
  }

  addNewRow() {
    const newRow = this.fb.group<IForm<ISearchRoute>>({
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      //TODO  add custom validator greater than prev departureDate value
      departureDate: [
        null,
        [Validators.required, CustomValidators.dateValidator()],
      ],
    });

    this.routes.push(newRow);
  }

  routeIsActive(index: number) {
    return this.routes.at(index).enabled;
  }

  isMultiPath() {
    return this._travelType === TravelTypesEnum.MultiPath;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  prepareMultiPathControlsState() {
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

  private onTravelTypeChange() {
    this.prepareReturnDateState();
    this.prepareMultiPathControlsState();
  }

  private prepareReturnDateState() {
    if (!this.isRoundTrip()) {
      this.form.controls.routes.at(0).controls.returnDate.disable();
      this.routes.at(0).controls.returnDate.disable();
      return;
    }
    this.routes.at(0).controls.returnDate.enable();
  }

  private isRoundTrip() {
    return this._travelType === TravelTypesEnum.RoundTrip;
  }

  // private travelTypeChangesUpdate(changes: any) {
  //   if (changes.travelType) {
  //     this._travelType = this.travelType;
  //     this.onTravelTypeChange();
  //   }
  // }
}
