import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { ROOT_REDUCERS, ROOT_EFFECTS } from '@store/index';
import { environment } from '@environments/environment';
import { PageNotFoundComponent, HeaderComponent } from '@core/components';

@NgModule({
	declarations: [PageNotFoundComponent, HeaderComponent],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		StoreModule.forRoot(ROOT_REDUCERS, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictStateSerializability: true,
				strictActionSerializability: true
			}
		}),
		StoreRouterConnectingModule.forRoot(),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !environment.production }),
		EffectsModule.forRoot(ROOT_EFFECTS)
	],
	exports: [PageNotFoundComponent, HeaderComponent],
	providers: []
})
export class CoreModule {}
