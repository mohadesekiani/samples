import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-passenger-group',
  templateUrl: './passenger-group.component.html',
  styleUrls: ['./passenger-group.component.scss'],
})
export class PassengerGroupComponent {
  @Input() controlValue;
  showDrop = false;
  adult;
  child;
  infant;
  //rename

  setInput(event, name) {
    this[name] = event.target.value;
  }
}
