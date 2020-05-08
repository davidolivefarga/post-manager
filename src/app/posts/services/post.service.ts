import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { Post } from '@posts/models';

@Injectable()
export class PostService {
	private apiUrl = 'http://localhost:3000/api/v1';

	constructor(private http: HttpClient) {}

	getPosts(): Observable<Post[]> {
		return this.http.get<Post[]>(`${this.apiUrl}/posts`);
	}

	createPost(post: Post): Observable<Post> {
		return this.http.post(`${this.apiUrl}/posts`, post) as Observable<Post>;
	}

	updatePost(post: Post): Observable<Post> {
		return this.http.put(`${this.apiUrl}/posts/${post.id}`, post) as Observable<Post>;
	}

	deletePosts(posts: Post[]): Observable<any[]> {
		return forkJoin(posts.map((post) => this.deletePost(post)));
	}

	deletePost(post: Post): Observable<any> {
		return this.http.delete(`${this.apiUrl}/posts/${post.id}`);
	}
}
