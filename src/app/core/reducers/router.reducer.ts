import * as fromRouter from '@ngrx/router-store';

export const routerFeatureKey = 'router';

export type RouterState = fromRouter.RouterReducerState;

export const routerReducer = fromRouter.routerReducer;
