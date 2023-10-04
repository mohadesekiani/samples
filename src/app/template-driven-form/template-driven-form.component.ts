import { Component } from '@angular/core';
import { IFlight } from '../module/flight.model';
import { GeneralTypesEnum } from '../module/enum/general-types.enum';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.scss'],
})
export class TemplateDrivenFormComponent {
  formData: Partial<IFlight> = {};
  showDrop = false;
  generalTypes = Object.values(GeneralTypesEnum).map(value => ({ title: value.replace(/([a-z])([A-Z])/g, '$1 $2'), value: value }));

}
