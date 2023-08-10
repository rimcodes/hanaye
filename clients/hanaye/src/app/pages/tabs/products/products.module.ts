import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreComponent } from './store/store.component';
import { ProvidersComponent } from './providers/providers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    ProductsPage,
    DetailsComponent,
    StoreComponent,
    ProvidersComponent,
  ],
})
export class ProductsPageModule {}
