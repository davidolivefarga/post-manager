import { createAction, props } from '@ngrx/store';

import { Post } from '@posts/models';

export const loadPosts = createAction('[Post/API] Load posts');
export const loadPostsSuccess = createAction('[Post/API] Load posts success', props<{ posts: Post[] }>());
export const loadPostsFail = createAction('[Post/API] Load posts fail', props<{ error: string }>());

export const updatePost = createAction('[Post/API] Update post', props<{ post: Post }>());
export const updatePostSuccess = createAction('[Post/API] Update post success', props<{ post: Post }>());
export const updatePostFail = createAction('[Post/API] Update post fail', props<{ error: string }>());

export const createPost = createAction('[Post/API] Create post', props<{ post: Post }>());
export const createPostSuccess = createAction('[Post/API] Create post success', props<{ post: Post }>());
export const createPostFail = createAction('[Post/API] Create post fail', props<{ error: string }>());

export const deletePosts = createAction('[Post/API] Delete posts', props<{ posts: Post[] }>());
export const deletePostsSuccess = createAction('[Post/API] Delete posts success', props<{ postIds: string[] }>());
export const deletePostsFail = createAction('[Post/API] Delete posts fail', props<{ error: string }>());
