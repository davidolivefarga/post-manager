import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { PostsRoutingModule } from '@posts/posts-routing.module';
import { PostListComponent, PostFormComponent } from '@posts/components';
import { PostService } from '@posts/services';
import { postFeatureKey, postReducer } from '@posts/reducers';
import { PostEffects } from '@posts/effects';

@NgModule({
	declarations: [PostListComponent, PostFormComponent],
	imports: [
		CommonModule,
		PostsRoutingModule,
		SharedModule,
		StoreModule.forFeature(postFeatureKey, postReducer),
		EffectsModule.forFeature([PostEffects])
	],
	exports: [],
	providers: [PostService]
})
export class PostsModule {}
