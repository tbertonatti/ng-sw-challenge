import { CharacterListComponent } from './components/character-list/character-list.component';
import { FilmListComponent } from './components/film-list/film-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: 'films', component: FilmListComponent },
  { path: 'films/:id/characters', component: CharacterListComponent },
  // { path: 'detail/:id/asd/:asd', component: HeroDetailComponent },
  { path: 'characters', component: CharacterListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
