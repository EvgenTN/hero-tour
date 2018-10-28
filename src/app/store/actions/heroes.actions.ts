import { Action } from '@ngrx/store';
import { heroesActionTypes } from '../constants/heroes.constants';
import { Hero } from '../../hero';

export class Load implements Action {
  readonly type = heroesActionTypes.LOAD;

  constructor(public payload: Hero[]) {}
}

export class Add implements Action {
  readonly type = heroesActionTypes.ADD;

  constructor(public payload: Hero[]) {}
}

export class Delete implements Action {
  readonly type = heroesActionTypes.DELETE;

  constructor(public payload: Hero[]) {}
}

export type HeroesActionsUnion = Load | Add | Delete;
