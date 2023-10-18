import { combineReducers } from "@ngrx/store";
import * as fromStatistics from './core/reducers/statistics.reducers';
import * as fromWords from './core/reducers/words.reducers';
import * as fromLanguage from './core/reducers/language.reducer';

export const appReducer = combineReducers({
  statistics: fromStatistics.statisticsReducer,
  words: fromWords.wordReducer,
  language: fromLanguage.languageReducer,
});
