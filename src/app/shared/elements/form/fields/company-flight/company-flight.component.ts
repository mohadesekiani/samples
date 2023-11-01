import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import { CompanyTypesFlightEnum } from 'src/app/core/module/enum/general-types.enum';
import { ICompanyFlight } from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-company-flight',
  templateUrl: './company-flight.component.html',
  styleUrls: ['./company-flight.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CompanyFlightComponent,
    },
  ],
})
export class CompanyFlightComponent extends BaseFormControlValueAccessor<ICompanyFlight> {
  types = Object.values(CompanyTypesFlightEnum).map((value) => ({
    controlName: value,
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value: false,
  }));

  constructor() {
    super();
  }

  override createForm() {
    super.createForm({
      Mahan: [false],
      Caspian: [false],
      Chabahar: [false],
    });
  }
}
