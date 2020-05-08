import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '@core/components';

const routes: Routes = [
	{
		path: 'posts',
		loadChildren: () => import('./posts/posts.module').then((mod) => mod.PostsModule)
	},
	{
		path: '',
		redirectTo: 'posts',
		pathMatch: 'full'
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
