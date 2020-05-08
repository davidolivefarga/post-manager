import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { ROOT_REDUCERS, ROOT_EFFECTS } from '@store/index';
import { environment } from '@environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		CoreModule,
		StoreModule.forRoot(ROOT_REDUCERS, {
			runtimeChecks: {
				strictStateSerializability: true,
				strictActionSerializability: true,
				strictActionWithinNgZone: true
			}
		}),
		StoreRouterConnectingModule.forRoot(),
		StoreDevtoolsModule.instrument({ name: 'Posts app', maxAge: 25, logOnly: !environment.production }),
		EffectsModule.forRoot(ROOT_EFFECTS)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
