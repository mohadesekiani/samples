import { Component } from '@angular/core';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.scss'],
})
export class TemplateDrivenFormComponent {
  formData: any = {};
  showDrop = false;
  options = [
    { label: 'Women Only', value: 'Women Only' },
    { label: 'Men Only', value: 'Men Only' },
    { label: 'General', value: 'General' },
  ];

}
