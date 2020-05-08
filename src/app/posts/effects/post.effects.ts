import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PostActions } from '@posts/actions';
import { PostService } from '@posts/services';

@Injectable()
export class PostEffects {
	constructor(private actions$: Actions, private postService: PostService) {}

	loadPosts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostActions.loadPosts),
			switchMap(() =>
				this.postService.getPosts().pipe(
					map((posts) => PostActions.loadPostsSuccess({ posts })),
					catchError((error) => of(PostActions.loadPostsFail({ error })))
				)
			)
		)
	);

	createPost$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostActions.createPost),
			switchMap(({ post }) =>
				this.postService.createPost(post).pipe(
					map((p) => PostActions.createPostSuccess({ post: p })),
					catchError((error) => of(PostActions.createPostFail({ error })))
				)
			)
		)
	);

	updatePost$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostActions.updatePost),
			switchMap(({ post }) =>
				this.postService.updatePost(post).pipe(
					map((p) => PostActions.updatePostSuccess({ post: p })),
					catchError((error) => of(PostActions.updatePostFail({ error })))
				)
			)
		)
	);

	deletePosts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(PostActions.deletePosts),
			switchMap(({ posts }) =>
				this.postService.deletePosts(posts).pipe(
					map(() => PostActions.deletePostsSuccess({ postIds: posts.map((post) => post.id) })),
					catchError((error) => of(PostActions.deletePostsFail({ error })))
				)
			)
		)
	);
}
