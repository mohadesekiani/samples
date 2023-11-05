import { Directive, Input } from '@angular/core';
import { BaseControlValueAccessor } from './base-control-value-accessor';

@Directive()
export abstract class BaseInputControlValueAccessor<T> extends BaseControlValueAccessor<T> {

  @Input() label!: string;
  @Input() name!: string;
  // ngControl: NgControl | undefined;

  // constructor(private baseInj: Injector) {
  //   super();
  // }

}
