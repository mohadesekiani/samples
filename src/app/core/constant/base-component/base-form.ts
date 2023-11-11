import { Directive } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { IForm } from '../../module/interface/search-types.interface';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';
import { Router } from '@angular/router';

@Directive()
export abstract class BaseForm<T> {
  form!: FormGroup<IForm<T>>;
  protected resultUrl!: string;
  protected formConfig!: IForm<T>;
  protected fb = new FormBuilder();
  protected validationErrorService = new ValidationErrorService();
  entity?: T;

  constructor(protected router: Router) {
    if (!router) { throw new Error('router is null'); }
  }

  ngOnInit() {
    this.createForm(this.formConfig);
  }

  createForm(
    baseFormConfig?: IForm<T>,
    validators?: ValidatorFn | ValidatorFn[] | null
  ) {
    this.form = this.fb.group(baseFormConfig as IForm<T>, {
      validators,
    });

    this.validationErrorService.process(this.form);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAsDirty();
      this.form.markAllAsTouched();

      return;
    }

    this.navigate(this.resultUrl);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }


  
}
