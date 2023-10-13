import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresComponent } from './stores.component';
import { StoreFormComponent } from './store-form/store-form.component';

const routes: Routes = [
  { path: '', component: StoresComponent },
  { path: 'form', component: StoreFormComponent },
  { path: 'form/:id', component: StoreFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresRoutingModule {}
