import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageAddVmComponent } from './page-add-vm.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [PageAddVmComponent]
})
export class PageAddVmModule { }
