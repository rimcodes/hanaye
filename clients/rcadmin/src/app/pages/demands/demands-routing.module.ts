import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandsComponent } from './demands.component';
import { DemandFormComponent } from './demand-form/demand-form.component';

const routes: Routes = [
  { path: '', component: DemandsComponent },
  {
    path: 'form',
    component: DemandFormComponent,
  },
  {
    path: 'form/:id',
    component: DemandFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandsRoutingModule {}
