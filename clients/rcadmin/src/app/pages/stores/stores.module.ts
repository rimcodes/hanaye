import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';
import { StoresRoutingModule } from './stores-routing.module';

import { StoresComponent } from './stores.component';
import { StoreFormComponent } from './store-form/store-form.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    StoresComponent,
    StoreFormComponent,
    LocationPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoresRoutingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    GoogleMapsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class StoresModule { }
