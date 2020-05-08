import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '@posts/models';

@Injectable()
export class PostService {
	private apiUrl = 'http://localhost:3000/api/v1';

	constructor(private http: HttpClient) {}

	getPosts(): Observable<Post[]> {
		return this.http.get<Post[]>(`${this.apiUrl}/posts`);
	}
}
