import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageVmComponent } from './page-vm.component';
import { InfoVmComponent } from './info-vm/info-vm.component';

import { AuthGuard } from '../shared/auth/auth-guard.service';

const pageVmRoutes: Routes = [
  { path: 'accesVm',  component: PageVmComponent, canActivate: [AuthGuard]},
  { path: 'accesVm/:id', component: InfoVmComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(pageVmRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PageVmRoutingModule { }
