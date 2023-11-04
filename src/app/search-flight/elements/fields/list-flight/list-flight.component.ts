import { Component, Input } from '@angular/core';
import { ICity } from 'src/app/core/module/interface/city-type.interface';
import { AbstractDataService } from 'src/app/core/services/data/abstract-data.service';

@Component({
  selector: 'app-list-flight',
  templateUrl: './list-flight.component.html',
  styleUrls: ['./list-flight.component.scss'],
})
export class ListFlightComponent {
  allItem!: ICity[];
  @Input() filteredItems!: ICity[];

  constructor(private dataService: AbstractDataService) {
    if (!dataService) { throw 'dataService is null'; }
  }

  ngOnInit(): void {
    this.dataService.getAllFakeData().subscribe((items: ICity[]) => {
      this.allItem = items;
    });
  }
}
