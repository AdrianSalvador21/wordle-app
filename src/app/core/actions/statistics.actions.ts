import { createAction, props } from '@ngrx/store';

export const setStatistics = createAction(
    '[Statistics] Set Statistics',
    props<{statistics: any}>()
);

export const setVictory = createAction(
    '[Statistics] Set Victory',
    props<any>()
);

export const setGame = createAction(
    '[Statistics] Set Game',
    props<any>()
);
