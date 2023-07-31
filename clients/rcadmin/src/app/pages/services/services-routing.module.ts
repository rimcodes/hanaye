import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';
import { ServiceFormComponent } from './service-form/service-form.component';

const routes: Routes = [
  { path: '', component: ServicesComponent },
  {
    path: 'form',
    component: ServiceFormComponent,
  },
  {
    path: 'form/:id',
    component: ServiceFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
