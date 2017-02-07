import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeModule } from './home/home.module';
import { PageVmModule } from './page-vm/page-vm.module';
import { PageAddVmModule } from './page-add-vm/page-add-vm.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DialogConnexionComponent } from './shared/dialog-connexion/dialog-connexion.component';
import { DialogInscriptionComponent } from './shared/dialog-inscription/dialog-inscription.component';
// import { DialogPaymentComponent } from './shared/dialog-payment/dialog-payment.component';

import { AuthService } from './shared/auth/auth.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
    DialogInscriptionComponent,
    DialogConnexionComponent,
    // DialogPaymentComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    FormsModule,
    HttpModule,
    PageVmModule,
    PageAddVmModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  entryComponents: [
     DialogInscriptionComponent,
     DialogConnexionComponent,
    //  DialogPaymentComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
