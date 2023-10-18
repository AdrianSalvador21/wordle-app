import { createReducer, on } from '@ngrx/store';
import { setLanguage } from '../actions/language.actions';

export const initialState = 'es';

export const languageReducer = createReducer(
  initialState,
  on(setLanguage, (state, { language }) => language),
);
