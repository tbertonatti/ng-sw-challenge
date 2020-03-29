import { FilmService } from './../../services/film.service';
import { CharacterService } from './../../services/character.service';
import { Character, Result, Film, FilterOption } from './../../interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  loading = false;
  film: Film = null;
  filters: { eye_color: string; gender: string; film: string } = {
    eye_color: '',
    gender: '',
    film: ''
  };
  possibleFilters: {
    eye_color: FilterOption<string>[];
    gender: FilterOption<string>[];
    film: FilterOption<number>[];
  } = {
    eye_color: [],
    gender: [],
    film: []
  };
  private characters: Character[];
  private films: Film[];
  page: number;
  count: number;
  filteredCharacters: Character[];
  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private filmService: FilmService
  ) {}

  ngOnInit(): void {
    this.page = 1;
    this.getCharacters();
  }

  getCharacters() {
    this.loading = true;
    this.filmService.getFilms().subscribe(films => {
      this.films = films;
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.film = this.films.find(
          f => f.url.replace('https://swapi.co/api/films/', '').slice(0, -1) === String(id)
        );
        // this.filmService.getFilmById(id).subscribe(film => {
        //   this.film = film;
        this.filters.film = this.film.title;
        forkJoin(
          this.film.characters.map(characterUrl => {
            return this.characterService.getCharactersByUrl(characterUrl);
          })
        ).subscribe((characters: Character[]) => {
          this.loadCharacters({
            count: characters.length,
            results: characters
          });
        });
        // });
      } else {
        this.characterService.getCharacters(this.page).subscribe(result => {
          this.loadCharacters(result);
        });
      }
    });
  }

  changePage(event: { pageIndex: number }) {
    this.page = event.pageIndex + 1;
    if (this.film) {
      this.filterCharacters();
    } else {
      this.filters = {
        eye_color: '',
        gender: '',
        film: ''
      };
      this.getCharacters();
    }
  }

  setFilter(filter, value) {
    this.filters[filter] = value;
    this.filterCharacters();
  }

  loadFilters() {
    const options = { gender: {}, film: {}, eye_color: {} };
    this.characters.forEach(c => {
      const addOption = (optionsObj, option) => {
        if (optionsObj[option]) {
          optionsObj[option].count++;
        } else {
          optionsObj[option] = { value: option, count: 1 };
        }
      };
      addOption(options.gender, c.gender);
      addOption(options.eye_color, c.eye_color);
      c.films.forEach(f => addOption(options.film, f.title));
    });
    this.possibleFilters = {
      eye_color: [],
      gender: [],
      film: []
    };
    Object.keys(options.gender).forEach(key => {
      this.possibleFilters.gender.push(options.gender[key]);
    });
    Object.keys(options.eye_color).forEach(key => {
      this.possibleFilters.eye_color.push(options.eye_color[key]);
    });
    Object.keys(options.film).forEach(key => {
      this.possibleFilters.film.push(options.film[key]);
    });
  }

  filterCharacters() {
    this.filteredCharacters = this.characters.filter(character => {
      let matchs = true;
      Object.keys(this.filters).forEach(field => {
        if (field === 'film') {
          let found = false;
          character.films.forEach(film => {
            found = found ? found : film.title === this.filters.film;
          });
          if (!found && this.filters.film) {
            matchs = false;
          }
        } else if (
          this.filters[field] &&
          character[field] !== this.filters[field]
        ) {
          matchs = false;
        }
      });
      return matchs;
    });
    if (this.film) {
      this.count = this.filteredCharacters.length;
      this.filteredCharacters = this.filteredCharacters.slice(
        10 * (this.page - 1),
        10 * this.page
      );
    }
  }

  loadCharacters(result: Result<Character>) {
    this.loading = false;
    this.count = result.count;
    this.characters = result.results.map(c => ({
      ...c,
      films: c.films.map((fUrl: string) => this.films.find(f => f.url === fUrl))
    }));
    this.loadFilters();
    this.filterCharacters();
  }
}
