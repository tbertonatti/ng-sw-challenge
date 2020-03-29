import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Film } from '../interfaces';

@Injectable({providedIn: 'root'})
export class FilmTriggerService {
  // film: Film = {title: '', episode_id: 0, opening_crawl: '', director: '', characters: []};
  film: Subject<Film> = new Subject();
  constructor() { }

  triggerFilm = (film: Film) => {
    // this.film = film;
    this.film.next(film);
  }
}
