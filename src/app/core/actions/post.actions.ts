import { createAction, props } from '@ngrx/store';

import { Post } from '@core/models';

export const loadPosts = createAction('[Post/API] Load posts');
export const loadPostsSuccess = createAction('[Post/API] Load posts success', props<{ posts: Post[] }>());
export const loadPostsFail = createAction('[Post/API] Load posts fail', props<{ error: any }>());
