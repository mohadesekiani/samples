import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increase-button',
  templateUrl: './increase-button.component.html',
  styleUrls: ['./increase-button.component.scss'],
})
export class IncreaseButtonComponent {
  @Input() item;
  @Input() buttonText!: string;
  @Output() valueChange = new EventEmitter<number>();

  addToValue() {
    console.log(this.item);
    this.item = this.item +1
    this.valueChange.emit(this.item);
  }
}
