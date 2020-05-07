import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Post } from '@core/models';
import { PostActions } from '@core/actions';

export const postFeatureKey = 'post';

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export interface PostState extends EntityState<Post> {
	loading: boolean;
	loaded: boolean;
}

export const initialPostState: PostState = postAdapter.getInitialState({
	loading: false,
	loaded: false
});

export const postReducer = createReducer<PostState>(
	initialPostState,
	on(PostActions.loadPosts, (state) => ({ ...state, loading: true })),
	on(PostActions.loadPostsFail, (state) => ({ ...state, loading: false })),
	on(PostActions.loadPostsSuccess, (state, { posts }) => ({
		...postAdapter.addAll(posts, state),
		loading: false,
		loaded: true
	}))
);
