import { Component, OnInit, Input } from '@angular/core';
import { Film } from 'src/app/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-list-item',
  templateUrl: './film-list-item.component.html',
  styleUrls: ['./film-list-item.component.scss']
})
export class FilmListItemComponent implements OnInit {
  @Input() film: Film;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  private extractIdByUrl = (url: string) => url.replace('https://swapi.co/api/films/', '').slice(0, -1);

  goToFilmCharacters = (url: string) => this.router.navigateByUrl(`/films/${this.extractIdByUrl(url)}/characters`);
}
