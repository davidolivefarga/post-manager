import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CoreModule } from '@core/core.module';

@Injectable({
	providedIn: CoreModule
})
export class PostsService {
	private apiUrl = 'http://localhost:3000/api/v1/posts';

	constructor(private http: HttpClient) {}
}
