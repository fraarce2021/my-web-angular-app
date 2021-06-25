import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  imports: [MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,MatSidenavModule,MatToolbarModule,MatListModule,MatCardModule,MatTableModule,MatSortModule],
  exports: [MatButtonModule,MatIconModule,MatFormFieldModule,MatInputModule,MatSidenavModule,MatToolbarModule,MatListModule,MatCardModule,MatTableModule,MatSortModule]
})

export class MaterialModule{}
