import {
  Component,
  INJECTOR,
  Inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import {
  IForm,
  ISearchMultiPaths,
} from 'src/app/models/search-types.interface';

@Component({
  selector: 'app-multi-paths',
  templateUrl: './multi-paths.component.html',
  styleUrls: ['./multi-paths.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MultiPathsComponent,
      multi: true,
    },
  ],
})
export class MultiPathsComponent implements ControlValueAccessor {
  form!: FormGroup;
  touched = false;
  disabled = false;
  @Input() item!: any;
  value!: [];

  onChange = (value) => {};

  onTouched = () => {};

  constructor(private fb: FormBuilder) {}

  writeValue(obj: any): void {
    this.form.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    this.formCreator();
    this.addNewRow();
  }

  formCreator() {
    this.form = this.fb.group<IForm<ISearchMultiPaths>>({
      multiPaths: this.fb.array([]),
    });

    this.form.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      this.onChange(this.form.value);
    });
  }

  get multiPaths() {
    return this.form.get('multiPaths') as FormArray;
  }

  addNewRow() {
    const newRow = this.fb.group({
      origin: [null, [Validators.required]],
      destination: [null, [Validators.required]],
      departureDate: [null],
      returnDate: [null],
    });
    this.multiPaths.push(newRow);
  }
}
