import { createAction, props } from '@ngrx/store';

export const setWord = createAction(
    '[Statistics] Set Word',
    props<any>()
);

export const setAllWords = createAction(
    '[Statistics] Set All Word',
    props<{words: any}>()
);