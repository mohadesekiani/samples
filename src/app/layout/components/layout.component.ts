import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITab } from 'src/app/core/module/interface/search-types.interface'

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.activeRouting()
  }

  activateTab(selectedTab: ITab) {
    this.tabs.forEach((tab) => (tab.active = false));
    selectedTab.active = true;
  }
  private activeRouting() {
    let activeRoute = this.tabs.find(x => x.route === this.router.url)
    if (activeRoute) {
      this.tabs.forEach((tab) => (tab.active = false));
      activeRoute.active = true
    }
  }
}
