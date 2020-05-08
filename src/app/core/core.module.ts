import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { PageNotFoundComponent, HeaderComponent } from '@core/components';

@NgModule({
	declarations: [PageNotFoundComponent, HeaderComponent],
	imports: [CommonModule, RouterModule, SharedModule],
	exports: [PageNotFoundComponent, HeaderComponent],
	providers: []
})
export class CoreModule {}
