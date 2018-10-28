import { Component, OnInit } from '@angular/core';
import { HeroService } from './hero.service';
import { Store } from '@ngrx/store';
import { AppStore } from './store/models/app-store.interface';
import { heroesActionTypes } from './store/constants/heroes.constants';
import { Hero } from './hero';
import { HeroesList } from './store/models/heroes-list.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tour of Heroes';

  constructor(
    private heroService: HeroService,
    private store: Store<AppStore>
  ) {}

  ngOnInit(): void {
    this.store.select('heroes')
      .subscribe(
        (value: HeroesList) => console.log('app_onInit', value));
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(
        (heroes: Hero[]) => {
          this.store.dispatch({type: heroesActionTypes.LOAD,
            payload: heroes});
        }
      );
  }
}
