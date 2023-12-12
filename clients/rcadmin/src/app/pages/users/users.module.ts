import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';

import { MatTabsModule } from '@angular/material/tabs'
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule  } from '@angular/material/select'
import { MatExpansionModule } from '@angular/material/expansion'

import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ClientsComponent } from './clients/clients.component';
import { WorkersComponent } from './workers/workers.component';
import { AdminsComponent } from './admins/admins.component';
import { UserItemComponent } from './user-item/user-item.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    ClientsComponent,
    WorkersComponent,
    AdminsComponent,
    UserItemComponent,
    LocationPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    UsersRoutingModule,
    GoogleMapsModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule
  ]
})
export class UsersModule { }
