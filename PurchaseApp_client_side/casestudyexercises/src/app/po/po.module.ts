import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { GeneratorComponent } from './generator/generator.component';
import { PoviewerComponent } from './poviewer/poviewer.component';

@NgModule({
  declarations: [
    GeneratorComponent,
    PoviewerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatComponentsModule
  ]
})
export class PoModule { }
