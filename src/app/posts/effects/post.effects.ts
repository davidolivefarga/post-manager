import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

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
					catchError((error: HttpErrorResponse) => of(PostActions.loadPostsFail({ error: error.message })))
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
					catchError((error: HttpErrorResponse) => of(PostActions.createPostFail({ error: error.message })))
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
					catchError((error: HttpErrorResponse) => of(PostActions.updatePostFail({ error: error.message })))
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
					catchError((error: HttpErrorResponse) => of(PostActions.deletePostsFail({ error: error.message })))
				)
			)
		)
	);

	postErrorHandler$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(
					PostActions.loadPostsFail,
					PostActions.createPostFail,
					PostActions.updatePostFail,
					PostActions.deletePostsFail
				),
				tap(({ error }) => {
					alert(
						`${error}\n\nRemember that the API of this application needs to run in localhost:3000. Please, make sure to run the "docker-compose" command and try again.`
					);
				})
			),
		{ dispatch: false }
	);
}
