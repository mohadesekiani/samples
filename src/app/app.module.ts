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
import { SearchTrainModule } from './search-train/search-train.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
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
