import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageAddVmComponent } from './page-add-vm.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { VmService } from '../shared/vm/vm.service';
import { StripeService } from '../shared/stripe/stripe.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [PageAddVmComponent],
  providers: [
    VmService,
    StripeService
  ],
})
export class PageAddVmModule { }
