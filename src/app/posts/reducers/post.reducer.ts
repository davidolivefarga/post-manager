import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Post } from '@posts/models';
import { PostActions } from '@posts/actions';
import { AppState } from '@store/index';

export const postFeatureKey = 'post';

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export interface PostState extends EntityState<Post> {
	loading: boolean;
	loaded: boolean;
}

export interface ExtendedAppState extends AppState {
	[postFeatureKey]: PostState;
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
	})),
	on(PostActions.createPost, (state, { post }) => ({ ...postAdapter.addOne(post, state) })),
	on(PostActions.updatePost, (state, { post }) => ({
		...postAdapter.updateOne({ id: post.id, changes: { ...post } }, state)
	})),
	on(PostActions.deletePostsSuccess, (state, { postIds }) => ({ ...postAdapter.removeMany(postIds, state) }))
);

// Post state selectors

const { selectAll } = postAdapter.getSelectors();

export const selectPostState = createFeatureSelector<ExtendedAppState, PostState>(postFeatureKey);

export const selectPosts = createSelector(selectPostState, selectAll);
