import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputControlValueAccessor } from 'src/app/core/constant/base-component/base-input-control-value-accessor';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckBoxComponent,
    },
  ],
})

export class CheckBoxComponent extends BaseInputControlValueAccessor<boolean> {
  override value: boolean = false;
  onCheckboxChange() {
    this.value = !this.value;    
    this.onChange(this.value);
  }
}
