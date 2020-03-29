import { FilmTriggerModule } from './../film-trigger/film-trigger.module';
import { FilmService } from './../../services/film.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmListComponent } from './film-list.component';
import { FilmListItemComponent } from './film-list-item/film-list-item.component';
import { CustomMaterialModule } from 'src/app/custom-material.module';

@NgModule({
  declarations: [FilmListComponent, FilmListItemComponent],
  providers: [FilmService],
  imports: [
    CommonModule,
    FilmTriggerModule,
    CustomMaterialModule
  ],
  exports: [FilmListComponent, FilmListItemComponent]
})
export class FilmListModule { }
