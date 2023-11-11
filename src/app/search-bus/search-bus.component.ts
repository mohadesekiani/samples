import { Component } from '@angular/core';
import { BaseForm } from '../core/constant/base-component/base-form';
import { IForm, ISearchBus } from '../core/module/interface/search-types.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.scss']
})
export class SearchBusComponent extends BaseForm<ISearchBus>{
  override resultUrl: string = 'result-bus';
  override formConfig = {
    routes: [null, [Validators.required]],
    passengers: [null, [Validators.required]],
    classBus: [null, [Validators.required]],
  }
}
