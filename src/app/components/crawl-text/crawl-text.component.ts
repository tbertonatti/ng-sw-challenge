import { FilmTriggerService } from './../../services/film-trigger.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crawl-text',
  templateUrl: './crawl-text.component.html',
  styleUrls: ['./crawl-text.component.css']
})
export class CrawlTextComponent implements OnInit {
  show = false;
  seconds: number;
  id: string;
  title: string;
  text: string;
  constructor(
    public filmTrigger: FilmTriggerService
  ) { }

  ngOnInit(): void {
    this.seconds = 10;
    this.filmTrigger.film.subscribe(film => {
      this.id = film.episode_roman;
      this.text = film.opening_crawl;
      this.title = film.title;
      this.seconds = (this.text.split('\r').length + this.text.split('\n').length);
      this.show = true;
      setTimeout(() => this.show = false, this.seconds * 1000);
      const tickTimer = () => this.seconds && this.show && setTimeout(() => {this.seconds--; tickTimer(); }, 1000);
      tickTimer();
    });
  }

}
