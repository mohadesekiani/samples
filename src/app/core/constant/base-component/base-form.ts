import { Directive } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { IForm } from '../../module/interface/search-types.interface';

@Directive()
export abstract class BaseForm<T> {
  form!: FormGroup<IForm<T>>
  protected fb = new FormBuilder();
  protected formConfig!: IForm<T>;

  ngOnInit() {
    this.createForm(this.formConfig);
  }

  createForm(
    baseFormConfig?: IForm<T>,
    validators?: ValidatorFn | ValidatorFn[] | null
  ) {
    return this.fb.group(baseFormConfig as IForm<T>, {
      validators,
    });
  }
}
