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
import { AdminAddAddTurnkeyComponent } from './admin-add-turnkey/admin-add-add-turnkey/admin-add-add-turnkey.component';
import { AdminAddAddVmComponent } from './admin-add-vm/admin-add-add-vm/admin-add-add-vm.component';
import { AdminAddAppComponent } from './admin-add-app/admin-add-app.component';
import { AdminAddAddAppComponent } from './admin-add-app/admin-add-add-app/admin-add-add-app.component';
import { NavbarAdminService } from './navbar-admin/navbar-admin.service';

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
    AdminAddTurnkeyComponent,
    AdminAddAddTurnkeyComponent,
    AdminAddAddVmComponent,
    AdminAddAppComponent,
    AdminAddAddAppComponent
  ],
  providers: [NavbarAdminService]
})
export class AdminModule { }
