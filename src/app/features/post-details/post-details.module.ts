import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { PostDetailsRoutingModule } from '@features/post-details/post-details-routing.module';
import { PostDetailsComponent } from '@features/post-details/components';

@NgModule({
	declarations: [PostDetailsComponent],
	imports: [CommonModule, PostDetailsRoutingModule, SharedModule],
	exports: [PostDetailsComponent],
	providers: []
})
export class PostDetailsModule {}
