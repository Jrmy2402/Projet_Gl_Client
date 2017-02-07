import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageVmComponent } from './page-vm.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { RouterModule } from '@angular/router';
import { InfoVmComponent } from './info-vm/info-vm.component';
import { PageVmRoutingModule } from './page-vm-routing.module';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    PageVmRoutingModule
  ],
  declarations: [PageVmComponent, InfoVmComponent]
})
export class PageVmModule { }
