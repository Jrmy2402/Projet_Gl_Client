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
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DialogConnexionComponent } from './shared/dialog-connexion/dialog-connexion.component';
import { DialogInscriptionComponent } from './shared/dialog-inscription/dialog-inscription.component';
import { DialogConfirmationComponent } from './shared/dialog-confirmation/dialog-confirmation.component';

import { AuthService } from './shared/auth/auth.service';
import { AuthModule } from './shared/auth/auth.module';
import { NavbarAdminService } from './admin/navbar-admin/navbar-admin.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
    DialogInscriptionComponent,
    DialogConnexionComponent,
    DialogConfirmationComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    FormsModule,
    HttpModule,
    PageVmModule,
    PageAddVmModule,
    AdminModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AuthModule
  ],
  entryComponents: [
     DialogInscriptionComponent,
     DialogConnexionComponent,
     DialogConfirmationComponent
  ],
  providers: [AuthService, NavbarAdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
