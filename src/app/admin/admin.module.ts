import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddVmComponent } from './admin-add-vm/admin-add-vm.component';
import { AdminListUserComponent } from './admin-list-user/admin-list-user.component';
import { AdminAddTurnkeyComponent } from './admin-add-turnkey/admin-add-turnkey.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminAddVmComponent,
    AdminListUserComponent,
    AdminAddTurnkeyComponent
  ]
})
export class AdminModule { }
