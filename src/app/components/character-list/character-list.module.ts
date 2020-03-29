import { FilmTriggerModule } from './../film-trigger/film-trigger.module';
import { CustomMaterialModule } from 'src/app/custom-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list.component';
import { CharacterListItemComponent } from './character-list-item/character-list-item.component';

@NgModule({
  declarations: [CharacterListComponent, CharacterListItemComponent],
  imports: [
    CommonModule,
    FilmTriggerModule,
    CustomMaterialModule
  ],
  exports: [CharacterListComponent]
})
export class CharacterListModule { }
