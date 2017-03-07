import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAddVmComponent } from './admin-add-vm/admin-add-vm.component';
import { AdminListUserComponent } from './admin-list-user/admin-list-user.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { AdminAddTurnkeyComponent } from './admin-add-turnkey/admin-add-turnkey.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminAddVmComponent,
    AdminListUserComponent,
    NavbarAdminComponent,
    AdminAddTurnkeyComponent
  ]
})
export class AdminModule { }
