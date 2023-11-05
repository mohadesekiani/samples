import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm } from '../core/constant/base-component/base-form';
import { TravelTypesEnum } from '../core/module/enum/travel-types.enum';
import {
  IForm,
  ISearchTrain,
} from '../core/module/interface/search-types.interface';
import { GeneralTypesEnum } from '../core/module/enum/general-types.enum';

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.scss'],
})
export class SearchTrainComponent extends BaseForm<ISearchTrain> {

  showDrop = false;
  generalTypes = Object.values(GeneralTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value: value,
  }));
  override path: string = '/result-train'
  override formConfig: IForm<ISearchTrain> = {
    travelType: [TravelTypesEnum.OneWay],
    routes: [null, [Validators.required]],
    passengers: [null, [Validators.required]],
    general: [null, [Validators.required]],
  };
  constructor() {
    super();
  }
}
