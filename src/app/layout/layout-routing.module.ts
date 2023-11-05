import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultFlightComponent } from '../search-flight/page/result-flight/result-flight.component';
import { LayoutComponent } from './components/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Train',
        loadChildren: () =>
          import('../search-train/search-train.module').then(
            (m) => m.SearchTrainModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../search-flight/search-flight.module').then(
            (m) => m.SearchFlightModule
          ),
      },
    ],
  },
  {
    path: 'result-flight',
    component: ResultFlightComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
