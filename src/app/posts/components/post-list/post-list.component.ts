import { PostFormData } from './../post-form/post-form.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MapOptions, tileLayer, latLng } from 'leaflet';

import { AppState } from '@store/index';
import { selectPosts } from '@posts/reducers';
import { Post } from '@posts/models';
import { PostActions } from '@posts/actions';
import { PostFormComponent } from '../post-form/post-form.component';

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

	constructor(private store: Store<AppState>, public dialog: MatDialog) {}

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
			layers: [
				tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', { maxZoom: 18, attribution: '...' })
			],
			zoom: 9,
			center: latLng(Number(post.lat), Number(post.long))
		};
	}

	createPost(): void {
		this.openPostFormDialog(null);
	}

	editPost(post: Post): void {
		this.openPostFormDialog(post);
	}

	deletePosts(): void {
		this.store.dispatch(PostActions.deletePosts({ posts: this.selection.selected }));
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

	private openPostFormDialog(post: Post): void {
		this.dialog.open<PostFormComponent, PostFormData>(PostFormComponent, {
			width: '900px',
			height: '650px',
			data: { post },
			disableClose: true
		});
	}
}
