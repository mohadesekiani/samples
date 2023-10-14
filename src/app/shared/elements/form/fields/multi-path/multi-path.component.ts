import { Component, Injector, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { CustomValidators } from 'src/app/core/validations/custom.validators';
import {
  IForm,
  ISearchMultiPath,
  ISearchRoute,
} from 'src/app/core/module/interface/search-types.interface';
import { TravelTypesEnum } from 'src/app/core/module/enum/travel-types.enum';
import { BaseFormControlValueAccessor } from 'src/app/core/constance/base-component/base-form-control-value-accessor';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';

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
  _result: any;
  nameCtrl: string = 'departureDate';
  @Input() override get validationErrorMessage(): ValidationErrors | null {
    return this.validation.getFormValidationErrors(this.routes.at(0));
  }
  override set validationErrorMessage(value) {
    this._result = value;
  }
  @Input() get travelType(): TravelTypesEnum {
    return this._travelType;
  }
  set travelType(value: TravelTypesEnum) {
    this._travelType = value;
    this.onTravelTypeChange();
  }
  // form!: FormGroup<IForm<ISearchMultiPath>>;

  travelTypes = Object.values(TravelTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));

  get routes() {
    return this.form?.controls.routes as FormArray<
      FormGroup<IForm<ISearchRoute>>
    >;
  }

  constructor(fb: FormBuilder, validation: ValidationErrorService) {
    super(fb, validation);
  }

  override createForm() {
    const baseFormConfig: IForm<ISearchMultiPath> = {
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
    super.createForm(baseFormConfig);
    this.addNewRow();
    this.onTravelTypeChange();
  }

  addNewRow() {
    const newRow = this.fb.group<IForm<ISearchRoute>>({
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
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
    if (!this.form) {
      return;
    }

    this.prepareReturnDateState();
    this.prepareMultiPathControlsState();
  }

  private prepareReturnDateState() {
    if (!this.isRoundTrip()) {
      // this.form.controls.routes.at(0).controls.returnDate.disable();
      this.routes.at(0).controls.returnDate.disable();
      return;
    }
    // console.log(this._travelType);

    this.routes.at(0).controls.returnDate.enable();
    // this.form.controls.routes.at(0).controls.returnDate.enable();
  }

  private isRoundTrip() {
    return this._travelType === TravelTypesEnum.RoundTrip;
  }
}
