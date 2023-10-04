import { Component } from '@angular/core';
import { ITab } from '../module/interface/search-types.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  tabs: ITab[] = [
    { title: 'Flight', active: true, route: '/' },
    { title: 'Train', active: false, route: '/Train' },
  ];

  constructor() {}

  ngOnInit(): void {}

  activateTab(selectedTab: ITab) {
    this.tabs.forEach((tab) => (tab.active = false));
    selectedTab.active = true;
  }
}
