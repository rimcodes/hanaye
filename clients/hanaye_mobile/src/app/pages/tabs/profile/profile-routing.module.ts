import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ChangeComponent } from './change/change.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'edit',
    component: ChangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
