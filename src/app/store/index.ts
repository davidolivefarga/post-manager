import { InjectionToken } from '@angular/core';
import { ActionReducerMap, Action } from '@ngrx/store';

import { postFeatureKey, PostState, postReducer } from '@core/reducers';
import { PostEffects } from '@core/effects';

export interface AppState {
	[postFeatureKey]: PostState;
}

// Injection token needed for AOT compilation
export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState, Action>>('Root reducers token', {
	factory: () => ({
		[postFeatureKey]: postReducer
	})
});

export const ROOT_EFFECTS = [PostEffects];
