import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const modules = [
	ReactiveFormsModule,
	MatToolbarModule,
	MatTableModule,
	MatCheckboxModule,
	MatButtonModule,
	MatDialogModule,
	MatFormFieldModule,
	MatInputModule,
	LeafletModule
];

@NgModule({
	declarations: [],
	imports: modules,
	exports: modules,
	providers: []
})
export class SharedModule {}
