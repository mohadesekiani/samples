import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchTrainRoutingModule } from './search-train-routing.module';
import { SearchTrainComponent } from './search-train.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ResultTrainComponent } from './page/result-train/result-train.component';
const routes: Routes = [
  {
    path: 'result-train',
    component: ResultTrainComponent,
  },
];

@NgModule({
  declarations: [SearchTrainComponent, ResultTrainComponent],
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SearchTrainRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
})
export class SearchTrainModule {}
