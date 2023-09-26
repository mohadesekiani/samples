import { Component } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  providers:[
    {provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:ButtonToggleComponent
    }
  ]
})
export class ButtonToggleComponent implements ControlValueAccessor{
  form!: FormGroup;

  constructor() {}

  onChange = (value:any) => { };

  onTouched = () => { };

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
    // this.disabled = isDisabled;
  }

  travelTypesClick(selectedTravelType: string) {
    // this.flightForm.patchValue({
    //   travelType: selectedTravelType,
    // });
    // console.log(selectedTravelType,this.flightForm.get("multiPath"));
    // if (selectedTravelType == 'OneWay') {
    //   this.flightForm.get("multiPath")?.setValue([])
      
    // }
    // if (selectedTravelType === 'OneWay') {
    //   const multiPathArray = this.flightForm.get('multiPath') as FormArray;
    //   while (multiPathArray.value['multiPath'].length > 1) {
    //     multiPathArray.value['multiPath'].length = 1 
    //     console.log("kkkkkk",multiPathArray.value['multiPath']);
    //   }
    // }
  }

}
