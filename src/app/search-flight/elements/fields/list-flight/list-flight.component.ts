import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';

@Component({
  selector: 'app-list-flight',
  templateUrl: './list-flight.component.html',
  styleUrls: ['./list-flight.component.scss'],
})
export class ListFlightComponent {
  allItem!: ICity[];
  private _filteredItems!: ICity[];
  @Input() get filteredItems(): ICity[] {
    return this._filteredItems;
  }
  set filteredItems(value: ICity[]) {
    this._filteredItems = value;
  }
  constructor(private dataService: AbstractDataService) {
    if (!this.dataService) {
      throw 'AbstractDataService is null';
    }
  }
  ngOnInit(): void {
    this.dataService.getAllFakeData().subscribe((items: ICity[]) => {
      this.allItem = items;
    });
  }
}
