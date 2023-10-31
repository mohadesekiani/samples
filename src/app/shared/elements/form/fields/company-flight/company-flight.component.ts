import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  IClassFlight,
  IForm,
} from 'src/app/core/module/interface/search-types.interface';

@Component({
  selector: 'app-company-flight',
  templateUrl: './company-flight.component.html',
  styleUrls: ['./company-flight.component.scss'],
})
export class CompanyFlightComponent {
  baseFormConfig: IForm<IClassFlight> = {
    classes: this.fb.array([]),
  };
ngOnInit(): void {

  
}
  constructor(private fb: FormBuilder) {}
}
