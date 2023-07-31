import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
import { ServiceFormComponent } from './service-form/service-form.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ServicesComponent,
    ServiceFormComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ServicesRoutingModule,
    MatButtonModule
  ]
})
export class ServicesModule { }
