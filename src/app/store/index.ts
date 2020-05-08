import { InjectionToken } from '@angular/core';
import { ActionReducerMap, Action } from '@ngrx/store';

import { routerFeatureKey, RouterState, routerReducer } from '@core/reducers';

export interface AppState {
	[routerFeatureKey]: RouterState;
}

// Injection token needed for AOT compilation
export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
	factory: () => ({
		[routerFeatureKey]: routerReducer
	})
});

export const ROOT_EFFECTS = [];
