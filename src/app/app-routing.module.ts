import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '@core/components';

const routes: Routes = [
	{
		path: 'posts',
		loadChildren: () => import('./features/post-list/post-list.module').then((mod) => mod.PostListModule)
	},
	{
		path: 'post/:id',
		loadChildren: () => import('./features/post-details/post-details.module').then((mod) => mod.PostDetailsModule)
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
