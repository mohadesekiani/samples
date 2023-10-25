import { Component } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BaseFormControlValueAccessor } from 'src/app/core/constant/base-component/base-form-control-value-accessor';
import { IRangePrice } from 'src/app/core/module/interface/search-types.interface';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';

@Component({
  selector: 'app-price-range',
  templateUrl: './price-range.component.html',
  styleUrls: ['./price-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PriceRangeComponent,
    },
  ],
})
export class PriceRangeComponent extends BaseFormControlValueAccessor<IRangePrice>   {
  constructor(fb: FormBuilder, validationErrorService: ValidationErrorService) {
    super(fb, validationErrorService);
  }
  
  override createForm() {
    super.createForm({
      minPrice: [null, [Validators.required]],
      maxPrice: [null, [Validators.required]],
    });
  }
}
