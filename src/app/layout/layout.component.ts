import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  tabs = [
    { title: 'Flight', active: true ,route:'/'},
    { title: 'Train', active: false ,route:'Train'},
  ];

  constructor() {}

  ngOnInit(): void {}

  activateTab(selectedTab) {
    this.tabs.forEach((tab) => (tab.active = false));
    selectedTab.active = true;
  }
}
