import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { MatListModule } from '@angular/material/list'

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MapComponent } from './map/map.component';
import { DemandItemComponent } from './demand-item/demand-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DashboardComponent,
    MapComponent,
    DemandItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GoogleMapsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DashboardModule { }
