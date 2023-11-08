import { Component, Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseForm } from '../../core/constant/base-component/base-form';
import { GeneralTypesEnum } from '../../core/module/enum/general-types.enum';
import {
  TravelTrainTypesEnum,
  TravelTypesEnum,
} from '../../core/module/enum/travel-types.enum';
import {
  IForm,
  ISearchTrain,
} from '../../core/module/interface/search-types.interface';

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.scss'],
})
export class SearchTrainComponent extends BaseForm<ISearchTrain> {
  showDrop = false;
  travelTypes = Object.values(TravelTrainTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));
  get travelType(): TravelTypesEnum {
    return this.form.controls.travelType?.value as TravelTypesEnum;
  }
  generalTypes = Object.values(GeneralTypesEnum).map((value) => ({
    title: value.replace(/([a-z])([A-Z])/g, '$1 $2'),
    value,
  }));
  override resultUrl: string = '/result-train';
  override formConfig: IForm<ISearchTrain> = {
    travelType: [TravelTypesEnum.OneWay],
    route: [null, [Validators.required]],
    passengers: [null, [Validators.required]],
    general: [null, [Validators.required]],
  };

  constructor(router: Router) {
    super(router);
  }

  toggleDropDown() {
    this.showDrop = !this.showDrop;
  }
}
