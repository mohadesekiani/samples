import { FormGroup } from '@angular/forms';
import { BaseControlValueAccessor } from './base-control-value-accessor';

export abstract class BaseControlValueAccessorForm extends BaseControlValueAccessor {
  abstract form: FormGroup;

  override writeValue(obj: any): void {
    this.form.patchValue(obj);
  }

}
