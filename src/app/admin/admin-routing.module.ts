import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddVmComponent } from './admin-add-vm/admin-add-vm.component';
import { AdminListUserComponent } from './admin-list-user/admin-list-user.component';
import { AdminAddAppComponent } from './admin-add-app/admin-add-app.component';
import { AdminAddTurnkeyComponent } from './admin-add-turnkey/admin-add-turnkey.component'


import { AuthGuard } from '../shared/auth/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['root', 'admin'] },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'manageOS', component: AdminAddVmComponent },
          { path: 'listUser', component: AdminListUserComponent },
          { path: 'manageTurnkey', component: AdminAddTurnkeyComponent },
          { path: 'manageApp', component: AdminAddAppComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
