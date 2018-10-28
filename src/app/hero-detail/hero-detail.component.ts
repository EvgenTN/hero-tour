import { Component, OnInit, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { NgOnChangesFeature } from '@angular/core/src/render3';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/models/app-store.interface';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})

export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private store: Store<AppStore>
  ) { }

  ngOnInit() {
    this.getHero();
  }

  // getHero(): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   this.heroService.getHero(id)
  //     .subscribe(hero => this.hero = hero);
  // }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.select('heroes')
      .subscribe(
        value => {
          const heroId: number = value.list.findIndex(item => item.id === id);
          this.hero = value.list[heroId]; });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(_ => this.goBack());
    this.store.select('heroes')
    .subscribe(value => console.log('value on save', value)
    );
  }

}
