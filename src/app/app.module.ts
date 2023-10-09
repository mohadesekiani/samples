import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AbstractDataService } from './core/services/data/abstract-data.service';
import { FakeDataService } from './core/services/data/fake-data.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SearchTrainComponent } from './search-train/search-train.component';
import { SearchTrainModule } from './search-train/search-train.module';
//import { ReactiveFormComponent } from './reactive-form/ReactiveFormComponent';

@NgModule({
  declarations: [AppComponent, SearchTrainComponent],
  imports: [
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    SearchTrainModule,
  ],

  providers: [
    {
      provide: AbstractDataService,
      useClass: FakeDataService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
