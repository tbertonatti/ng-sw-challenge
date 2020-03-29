import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import { Result, Film } from '../interfaces';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'any'})
export class FilmService {
  private films: Film[] = null;
  private url = 'https://swapi.co/api/films/';
  constructor(
    private http: HttpClient
  ) { }

  getFilms(): Observable<Film[]> {
    if (this.films) {
      return of(this.films);
    } else {
      return this.http.get<Result<Film>>(this.url, {params: { format: 'json' }}).pipe(
        map(res => res.results.map(film => ({...film, episode_roman: this.romanize(film.episode_id)}))),
        switchMap(res => {
          // caching films
          this.films = res;
          return of(this.films);
        })
      );
    }
  }

  getFilmById(id: number): Observable<Film> {
    return this.http.get<Film>(this.url + id + '/', {params: { format: 'json' }}).pipe(
      map(res => ({...res, episode_roman: this.romanize(res.episode_id)}))
    );
  }

  getFilmByUrl(url: string): Observable<Film> {
    return this.http.get<Film>(url, {params: { format: 'json' }}).pipe(
      map(res => ({...res, episode_roman: this.romanize(res.episode_id)}))
    );
  }

  private romanize(num: number): string {
    if (isNaN(num)) {
      return '';
    }
    const digits = String(+num).split('');
    const key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
               '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
               '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    let roman = '';
    let i = 3;
    while (i--) {
        roman = (key[+digits.pop() + (i * 10)] || '') + roman;
    }
    return Array(+digits.join('') + 1).join('M') + roman;
  }
}
