import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddVmComponent } from './admin-add-vm/admin-add-vm.component';
import { AdminListUserComponent } from './admin-list-user/admin-list-user.component';
import { AdminAddAppComponent } from './admin-add-app/admin-add-app.component';
import { AdminAddTurnkeyComponent } from './admin-add-turnkey/admin-add-turnkey.component';
import { AdminAddAddTurnkeyComponent } from './admin-add-turnkey/admin-add-add-turnkey/admin-add-add-turnkey.component';
import { AdminAddAddAppComponent } from './admin-add-app/admin-add-add-app/admin-add-add-app.component';
import { AdminAddAddVmComponent } from './admin-add-vm/admin-add-add-vm/admin-add-add-vm.component';
import { ListVmUserComponent } from './admin-list-user/list-vm-user/list-vm-user.component';
import { InfoVmUserComponent } from './admin-list-user/list-vm-user/info-vm-user/info-vm-user.component';

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
          { path: 'manageTurnkey',  component: AdminAddTurnkeyComponent},
          { path: 'addTurnkey',  component: AdminAddAddTurnkeyComponent},
          { path: 'manageOS', component: AdminAddVmComponent },
          { path: 'addOS', component: AdminAddAddVmComponent },
          { path: 'listUser', component: AdminListUserComponent },
          { path: 'listUser/:id', component: ListVmUserComponent },
          { path: 'infoVMuser/:id', component: InfoVmUserComponent },
          { path: 'manageApp', component: AdminAddAppComponent },
          { path: 'addApp', component: AdminAddAddAppComponent },
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
