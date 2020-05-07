import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
	declarations: [],
	imports: [CommonModule, MatToolbarModule, MatTableModule, MatCheckboxModule, LeafletModule],
	exports: [MatToolbarModule, MatTableModule, MatCheckboxModule, LeafletModule],
	providers: []
})
export class SharedModule {}
