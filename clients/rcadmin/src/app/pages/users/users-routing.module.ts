import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ClientsComponent } from './clients/clients.component';
import { WorkersComponent } from './workers/workers.component';
import { AdminsComponent } from './admins/admins.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'workers',
        component: WorkersComponent,
      },
      {
        path: 'admins',
        component: AdminsComponent,
      },
      {
        path: '',
        redirectTo: '/users/clients',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'form',
    component: UserFormComponent,
  },
  {
    path: 'form/:id',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
