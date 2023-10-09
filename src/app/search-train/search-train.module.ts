import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchTrainRoutingModule } from './search-train-routing.module';
import { SearchTrainComponent } from './search-train.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [SearchTrainComponent],
  imports: [
    CommonModule,
    SearchTrainRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class SearchTrainModule { }
