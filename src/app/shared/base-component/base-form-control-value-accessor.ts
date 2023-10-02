import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BaseControlValueAccessor } from './base-control-value-accessor';
import { distinctUntilChanged } from 'rxjs';
import { IForm } from 'src/app/models/search-types.interface';

export abstract class BaseFormControlValueAccessor<T> extends BaseControlValueAccessor {
  form!: FormGroup<IForm<T>>;
  fb: FormBuilder;

  constructor(fb: FormBuilder) {
    super();
    this.fb = fb;
  }

  override writeValue(obj: any): void {
    this.form.patchValue(obj);
  }

  refersValue() {
    if (this.form.valid) {
      this.onChange(this.form.value);
      this.onTouched();
    } else {
      this.onChange(null);
    }
  }

  createBaseForm(baseFormConfig: IForm<T>) {
    this.form = this.fb.group(baseFormConfig);
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((x:any) => {
      this.refersValue();
    });
  }

}
