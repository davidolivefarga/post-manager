import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

	private map: Map;
	private changingMapCoordinates: boolean;

	constructor(
		public dialogRef: MatDialogRef<PostFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PostFormData,
		private store: Store<AppState>
	) {
		const post = data.post;

		this.postFormTitle = post ? 'Edit post' : 'New post';

		this.postFormGroup = new FormGroup({
			id: new FormControl(post ? post.id : ''),
			title: new FormControl(post ? post.title : ''),
			content: new FormControl(post ? post.content : ''),
			lat: new FormControl({ value: post ? Number(post.lat) : 41.3851, disabled: true }),
			long: new FormControl({ value: post ? Number(post.long) : 2.1734, disabled: true }),
			image_url: new FormControl(post ? post.image_url : '')
		});
	}

	onMapReady(map: Map) {
		this.map = map;
	}

	getMapOptions(): MapOptions {
		return <MapOptions>{
			layers: [
				tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', { maxZoom: 18, attribution: '...' })
			],
			zoom: 9,
			center: latLng(this.postFormGroup.get('lat').value, this.postFormGroup.get('long').value)
		};
	}

	onMapMove(): void {
		if (!this.changingMapCoordinates) {
			const mapCenter = this.map.getCenter();
			this.postFormGroup.get('lat').setValue(mapCenter.lat);
			this.postFormGroup.get('long').setValue(mapCenter.lng);
		}
	}

	onSaveForm() {
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

	onCloseForm() {
		this.dialogRef.close();
	}
}
