import { CustomMaterialModule } from 'src/app/custom-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmTriggerComponent } from './film-trigger.component';



@NgModule({
  declarations: [FilmTriggerComponent],
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  exports: [FilmTriggerComponent]
})
export class FilmTriggerModule { }
