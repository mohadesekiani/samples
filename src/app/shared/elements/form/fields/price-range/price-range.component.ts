import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import { IRangePrice } from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: PriceRangeComponent },
  ],
})
export class PriceRangeComponent extends BaseFormControlValueAccessor<IRangePrice>   {
  constructor() {
    super();
  }

  override createForm() {
    super.createForm({
      minPrice: [null, [Validators.required]],
      maxPrice: [null, [Validators.required]],
    });
  }
}
