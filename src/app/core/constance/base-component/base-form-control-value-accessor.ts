import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BaseControlValueAccessor } from './base-control-value-accessor';
import { distinctUntilChanged } from 'rxjs';
import { IForm } from 'src/app/module/interface/search-types.interface';
import { Directive } from '@angular/core';

@Directive()
export abstract class BaseFormControlValueAccessor<T> extends BaseControlValueAccessor<T> {
  form!: FormGroup<IForm<T>>;

  constructor(protected fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  override writeValue(obj: any): void {
    this.form.patchValue(obj);
  }

  refersValue() {
    if (this.form.valid) {
      this.onChange(this.form.value);
      this.onTouched();
      return;
    }

    this.onChange(null);
  }

  createForm(baseFormConfig?: IForm<T>) {
    this.form = this.fb.group(baseFormConfig as IForm<T>);
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((x: any) => {
      this.refersValue();
    });
  }

}
