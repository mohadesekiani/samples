import { Component } from '@angular/core';
import { IFlight } from '../core/module/interface/flight.interface';
import { GeneralTypesEnum } from '../core/module/enum/general-types.enum';

@Component({
  selector: 'app-search-train',
  templateUrl: './search-train.component.html',
  styleUrls: ['./search-train.component.scss'],
})
export class SearchTrainComponent {
  formData: Partial<IFlight> = {};
  showDrop = false;
  generalTypes = Object.values(GeneralTypesEnum).map(value => ({ title: value.replace(/([a-z])([A-Z])/g, '$1 $2'), value: value }));

}
