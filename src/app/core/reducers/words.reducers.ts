import { createReducer, on } from '@ngrx/store';
import { setAllWords, setWord } from '../actions/words.actions';

export const initialState = {
    selectedWord: 'basic',
    words: ['basic'],
};

export const wordReducer = createReducer(
  initialState,
  on(setWord, (state, {}) => {
    const randomNumber = Math.floor(Math.random() * state.words.length);
    return {
      ...state,
      selectedWord:  state.words[randomNumber].normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    }
  }),
  on(setAllWords, (state, { words }) => {
    return {
      ...state,
      words: words,
    }
  }),
);
