import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTrainComponent } from './component/search-train.component';

const routes: Routes = [{path:'',component:SearchTrainComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchTrainRoutingModule { }
