import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/models/app-store.interface';
import { HeroesList } from '../store/models/heroes-list.interface';
import { heroesActionTypes } from '../store/constants/heroes.constants';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private store: Store<AppStore>
  ) { }

  ngOnInit() {
    this.store.select('heroes')
      .subscribe((value: HeroesList) => this.heroes = value.list);
    console.log('heroesOnInit_works', this.heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        const newHeroes = [...this.heroes];
        newHeroes.push(hero);
        this.store.dispatch({
          type: heroesActionTypes.ADD,
          payload: newHeroes
        });
      });
  }
  delete(hero: Hero): void {
    this.heroService.deleteHero(hero)
      .subscribe(
        () => {
          this.store.dispatch({
            type: heroesActionTypes.DELETE,
            payload: this.heroes.filter(h => h !== hero)
          });
        });
  }
}
