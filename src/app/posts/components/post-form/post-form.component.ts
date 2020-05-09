import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Map, MapOptions, tileLayer, latLng } from 'leaflet';

import { AppState } from '@store/index';
import { Post } from '@posts/models';
import { PostActions } from '@posts/actions';

export interface PostFormData {
	post: Post;
}

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
	postFormTitle: string;
	postFormGroup: FormGroup;
	mapOptions: MapOptions;

	private map: Map;

	constructor(
		public dialogRef: MatDialogRef<PostFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PostFormData,
		private store: Store<AppState>
	) {
		const post = data.post;
		const postLat = post ? Number(post.lat) : 41.3851;
		const postLng = post ? Number(post.long) : 2.1734;

		this.postFormTitle = post ? 'Edit post' : 'New post';

		this.postFormGroup = new FormGroup({
			id: new FormControl(post ? post.id : ''),
			title: new FormControl(post ? post.title : '', Validators.required),
			content: new FormControl(post ? post.content : '', Validators.required),
			lat: new FormControl({ value: postLat, disabled: true }),
			long: new FormControl({ value: postLng, disabled: true }),
			image_url: new FormControl(post ? post.image_url : '')
		});

		this.mapOptions = {
			layers: [tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', { maxZoom: 18 })],
			center: latLng(postLat, postLng),
			zoom: 9
		};
	}

	onMapReady(map: Map): void {
		this.map = map;
	}

	onMapMove(): void {
		const mapCenter = this.map.getCenter();
		this.postFormGroup.get('lat').setValue(mapCenter.lat);
		this.postFormGroup.get('long').setValue(mapCenter.lng);
	}

	isSaveDisabled(): boolean {
		return (
			this.postFormGroup.get('title').hasError('required') || this.postFormGroup.get('content').hasError('required')
		);
	}

	onSaveForm(): void {
		const now = new Date().toISOString();
		const postFormGroupData = this.postFormGroup.getRawValue();

		if (postFormGroupData.id) {
			const post: Post = { ...postFormGroupData, updated_at: now };
			this.store.dispatch(PostActions.updatePost({ post }));
		} else {
			const post: Post = { ...postFormGroupData, updated_at: now, created_at: now };
			this.store.dispatch(PostActions.createPost({ post }));
		}

		this.dialogRef.close();
	}

	onCloseForm(): void {
		this.dialogRef.close();
	}
}
