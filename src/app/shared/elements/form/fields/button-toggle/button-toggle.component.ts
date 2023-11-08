import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor } from 'src/app/core/constant/base-component/base-control-value-accessor';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ButtonToggleComponent,
      multi: true,
    },
  ],
})
export class ButtonToggleComponent extends BaseControlValueAccessor<string>{
  override value: string =''
  @Input() items!: Array<{ value: any, title: string }>
  onValueChange(item: { value: any, title: string }) {
    this.value = item.value
    // console.log(this.value);
    
  }
}
