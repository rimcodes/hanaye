import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';
import { DetailsComponent } from './details/details.component';
import { StoreComponent } from './store/store.component';
import { ActivatedGuard } from 'src/app/guards/activated.guard';
import { ProvidersComponent } from './providers/providers.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage
  },
  // {
  //   path: 'providers',
  //   component: ProvidersComponent
  // },
  {
    path: 'providers/:id',
    component: ProvidersComponent
  },
  {
    path: 'store/:id',
    component: StoreComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
