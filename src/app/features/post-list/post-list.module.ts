import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { PostListRoutingModule } from '@features/post-list/post-list-routing.module';
import { PostListComponent } from '@features/post-list/components';

@NgModule({
	declarations: [PostListComponent],
	imports: [CommonModule, PostListRoutingModule, SharedModule],
	exports: [PostListComponent],
	providers: []
})
export class PostListModule {}
