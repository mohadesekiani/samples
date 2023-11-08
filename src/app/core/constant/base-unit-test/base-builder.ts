import { Router } from '@angular/router';
import { BaseForm } from '../base-component/base-form';

export abstract class BaseBuilder<Q extends BaseForm<any>> {
  router: jasmine.SpyObj<Router>;
  formValue!: Partial<Q['entity']>;
  abstract get some_data(): Partial<Q['entity']>;
  abstract get expected_default_form_value(): Partial<Q['entity']>;

  constructor() {
    this.router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
  }

  with_some_data_for_form() {
    return this.with_data_for_form(this.some_data);
  }

  with_data_for_form(value: T): this {
    this.formValue = value;
    return this;
  }
  with_some_valid_data_for_form(valueForm: T): this {
    this.with_data_for_form(valueForm);
    return this;
  }

  with_some_invalid_data_for_form(valueForm: T): this {
    this.with_data_for_form(valueForm);
    return this;
  }

  abstract build(): Q;

  afterBuild(sut: Q) {
    sut.ngOnInit();

    if (this.formValue) {
      sut.form.patchValue(this.formValue);
    }
  }
}
