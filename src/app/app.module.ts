import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogInscriptionComponent } from './dialog-inscription/dialog-inscription.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
    DialogInscriptionComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [
     DialogInscriptionComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
