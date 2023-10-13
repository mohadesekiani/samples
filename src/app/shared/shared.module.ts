import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ElementsModule } from './elements/elements.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagePipe } from './pips/error-message.pipe';

const SHARED_MODULES = [
  CommonModule,
  NgIf,
  ElementsModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [ErrorMessagePipe],
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES, ErrorMessagePipe],
})
export class SharedModule {}
