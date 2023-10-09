import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import { ResultsComponent } from '../results/results.component';
import { SearchFlightComponent } from '../search-flight/search-flight.component';

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
        path: 'flight',
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
