import { HeroesList } from '../models/heroes-list.interface';
import { HeroesActionsUnion } from '../actions/heroes.actions';
import { heroesActionTypes } from '../constants/heroes.constants';
import { listener } from '@angular/core/src/render3/instructions';

const initialState: HeroesList = {
  list: []
};

export function heroesReducer(state: HeroesList = initialState, action: HeroesActionsUnion) {
  switch (action.type) {
    case heroesActionTypes.LOAD:
    console.log('load_works', state);
    return {
      list: action.payload
    };
    case heroesActionTypes.ADD:
    return {
      ...state,
      list: action.payload
    };
    case heroesActionTypes.DELETE:
    return {
      ...state,
      list: action.payload
    };
    default:
    console.log('default_works', state);
    return state;
  }
}
