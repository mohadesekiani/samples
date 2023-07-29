import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from '../template-driven-form/template-driven-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ReactiveFormComponent,
      },
      {
        path: 'Train',
        component: TemplateDrivenFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
