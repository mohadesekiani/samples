import { Component } from '@angular/core';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
})
export class ButtonToggleComponent {
  button1Disabled = false;
  button2Disabled = true;
  button3Disabled = true;

  constructor() {}

  activateButton(buttonNumber: number) {
    this.button1Disabled = buttonNumber === 1 ? false : true;
    this.button2Disabled = buttonNumber === 2 ? false : true;
    this.button3Disabled = buttonNumber === 3 ? false : true;
  }
}
