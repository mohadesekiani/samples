import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import { ClassesTypesFlightEnum } from 'src/app/core/module/enum/general-types.enum';
import { IClassFlight } from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-check-box-group',
  templateUrl: './check-box-group.component.html',
  styleUrls: ['./check-box-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckBoxGroupComponent,
    },
  ],
})
export class CheckBoxGroupComponent extends BaseFormControlValueAccessor<IClassFlight> {
  types = Object.values(ClassesTypesFlightEnum).map((value) => ({
    controlName:value,
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value: false,
  }));

  constructor() {
    super();
  }

  override createForm() {
    super.createForm({
      Classy: [false],
      CommercialGrade: [false],
      EconomicGrade: [false],
      PremiumGrade: [false],
    });
  }
}
