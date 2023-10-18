import { createReducer, on } from '@ngrx/store';
import { setGame, setStatistics, setVictory } from '../actions/statistics.actions';

export const initialState = {
  statisticsData: {
    totalGames: 0,
    gamesWon: 0,
  }
};

export const statisticsReducer = createReducer(
  initialState,
  on(setStatistics, (state, { statistics }) => {
    return {
      ...state,
      statisticsData: {
        ...state.statisticsData,
        ...statistics,
      },
    }
  }),
  on(setVictory, (state, {}) => {
    return {
      ...state,
      statisticsData: {
        ...state.statisticsData,
        gamesWon: state.statisticsData.gamesWon + 1,
      },
    }
  }),
  on(setGame, (state, {}) => {
    return {
      ...state,
      statisticsData: {
        ...state.statisticsData,
        totalGames: state.statisticsData.totalGames + 1,
      },
    }
  }),
);
