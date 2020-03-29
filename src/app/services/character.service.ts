import { Character, Result } from './../interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({providedIn: 'any'})
export class CharacterService {
  private url = 'https://swapi.co/api/people/';
  private loadedCharacters = {};
  constructor(
    private http: HttpClient
  ) { }

  private formatParams = (params = {}) => ({params: {...params, format: 'json'}});

  getCharacters(page: number = 1): Observable<Result<Character>> {
    return this.http.get<Result<Character>>(this.url, this.formatParams({page: String(page)}));
  }

  getCharactersById(id: number): Observable<Character> {
    if (this.loadedCharacters[id]) {
      return of(this.loadedCharacters[id]);
    } else {
      return this.http.get<Character>(this.url + id, this.formatParams()).pipe(
        switchMap(res => {
          // caching character
          this.loadedCharacters[id] = res;
          return of(res);
        })
      );
    }
  }

  getCharactersByUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url, this.formatParams());
  }
}
