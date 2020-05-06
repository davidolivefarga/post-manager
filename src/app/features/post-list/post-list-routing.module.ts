import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from '@features/post-list/components';

const routes: Routes = [
	{
		path: '',
		component: PostListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PostListRoutingModule {}
