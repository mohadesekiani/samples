import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from '../results/results.component';

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
    path: 'results',
    component: ResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
