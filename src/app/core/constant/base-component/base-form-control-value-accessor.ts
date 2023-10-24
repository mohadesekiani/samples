import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { BaseControlValueAccessor } from './base-control-value-accessor';
import { distinctUntilChanged } from 'rxjs';
import { IForm } from 'src/app/core/module/interface/search-types.interface'
import { Directive, Injector, Input } from '@angular/core';
import { ValidationErrorService } from 'src/app/shared/services/validation-error.service';

@Directive()
export abstract class BaseFormControlValueAccessor<T> extends BaseControlValueAccessor<T> {
  form!: FormGroup<IForm<T>>;


  constructor(
    protected fb: FormBuilder,
    protected validationErrorService: ValidationErrorService
  ) {
    super();

    if (!fb) { throw new Error('formBuilder is null'); }
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

  createForm(baseFormConfig?: IForm<T>, validators?: ValidatorFn | ValidatorFn[] | null) {
    this.form = this.fb.group(baseFormConfig as IForm<T>, {
      validators
    });
    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((x: any) => {
      this.refersValue();
    });
  }

}
