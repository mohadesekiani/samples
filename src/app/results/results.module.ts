import { RouterModule } from '@angular/router';
import { ResultsComponent } from './results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { ResultsRoutingModule } from './results-routing.module';

@NgModule({
  declarations: [ResultsComponent],
  imports: [
    ResultsRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ResultModule {}
