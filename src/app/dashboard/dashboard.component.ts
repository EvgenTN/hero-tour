import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/models/app-store.interface';
import { HeroesList } from '../store/models/heroes-list.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private store: Store<AppStore>
  ) { }

  ngOnInit() {
    this.store.select('heroes')
      .subscribe(
        (heroes: HeroesList) => this.heroes = heroes.list.slice(0, 4));
  }

}
