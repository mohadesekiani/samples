import { Router } from '@angular/router';

export class BaseBuilder<T> {
  router: jasmine.SpyObj<Router>;
  formValue!: T;

  constructor() {
    this.router = jasmine.createSpyObj<Router>('Router', ['navigate']) as any;
  }
  with_data_for_form(value:T): this {
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

  build(componentClass: new (router: jasmine.SpyObj<Router>) => any): any {
    const sut = new componentClass(this.router);

    sut.ngOnInit();

    if (this.formValue) {
      sut.form.patchValue(this.formValue);
    }

    return sut;
  }
}
