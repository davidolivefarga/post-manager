import { Component } from '@angular/core';

import { TestService } from './test.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'wefox-challenge';

	constructor(private service: TestService) {
		this.service.test();
	}
}
