import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MapOptions, tileLayer, latLng } from 'leaflet';

import { AppState } from '@store/index';
import { selectPosts } from '@core/reducers';
import { Post } from '@core/models';
import { PostActions } from '@core/actions';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
	displayedColumns: string[] = ['select', 'id', 'title', 'content', 'location', 'image', 'updated', 'created', 'edit'];
	selection = new SelectionModel<any>(true, []);
	posts: Post[];

	private subscriptions = new Subscription();

	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.store.dispatch(PostActions.loadPosts());

		this.subscriptions.add(
			this.store.pipe(select(selectPosts)).subscribe((posts) => {
				this.posts = posts;
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.unsubscribe();
	}

	getLeafletOptions(post: Post): MapOptions {
		return <MapOptions>{
			layers: [tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })],
			zoom: 8,
			center: latLng(Number(post.lat), Number(post.long))
		};
	}

	isAllPostsSelected(): boolean {
		return this.selection.selected.length === this.posts.length;
	}

	isAnyPostSelected(): boolean {
		return this.selection.selected.length > 0;
	}

	onMasterToggle(): void {
		this.isAllPostsSelected() ? this.selection.clear() : this.posts.forEach((row) => this.selection.select(row));
	}
}
