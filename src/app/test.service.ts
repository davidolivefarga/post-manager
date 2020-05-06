import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TestService {
	private postsURL = 'http://localhost:3000/api/v1/posts';

	constructor(private http: HttpClient) {}

	test() {
		console.log('Calling test method');

		try {
			const obs = this.http.get<any>(this.postsURL);
			obs.subscribe((data) => {
				console.log('Result: ', data);
			});
		} catch (e) {
			console.log('Call failed: ', e);
		}
	}
}
