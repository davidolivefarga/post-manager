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
}
