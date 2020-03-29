import { FilmTriggerService } from './../../services/film-trigger.service';
import { Component, OnInit, Input } from '@angular/core';
import { Film } from 'src/app/interfaces';

@Component({
  selector: 'app-film-trigger',
  templateUrl: './film-trigger.component.html',
  styleUrls: ['./film-trigger.component.scss']
})
export class FilmTriggerComponent implements OnInit {
  @Input() film: Film;
  constructor(
    private filmTrigger: FilmTriggerService
  ) { }

  ngOnInit(): void {
  }

  triggerFilm = () => this.filmTrigger.triggerFilm(this.film);
}
