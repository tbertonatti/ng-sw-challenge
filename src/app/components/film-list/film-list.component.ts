import { FilmService } from './../../services/film.service';
import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {
  loading = true;
  films: Film[];
  constructor(
    private filmService: FilmService
  ) { }
  // private getSub = new Subscription();
  // private cancelGet = () => this.getSub.unsubscribe();
  // this.getSub = this.http.get(this.url + value)
  ngOnInit(): void {
    this.filmService.getFilms().subscribe(res => {
      this.loading = false;
      this.films = res;
    }, err => {
      console.log(err);
      this.loading = false;
      // tslint:disable-next-line: max-line-length
      this.films = [{title: 'A New Hope', episode_id: 4, episode_roman: 'IV', opening_crawl: `It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....`, director: 'George Lucas', characters: ['https://swapi.co/api/people/1/', 'https://swapi.co/api/people/2/', 'https://swapi.co/api/people/3/', 'https://swapi.co/api/people/4/', 'https://swapi.co/api/people/5/', 'https://swapi.co/api/people/6/', 'https://swapi.co/api/people/7/', 'https://swapi.co/api/people/8/', 'https://swapi.co/api/people/9/', 'https://swapi.co/api/people/10/', 'https://swapi.co/api/people/12/', 'https://swapi.co/api/people/13/', 'https://swapi.co/api/people/14/', 'https://swapi.co/api/people/15/', 'https://swapi.co/api/people/16/', 'https://swapi.co/api/people/18/', 'https://swapi.co/api/people/19/', 'https://swapi.co/api/people/81/']}];
      // this.err = err;
    });
  }

}
