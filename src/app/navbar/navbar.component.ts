import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogConnexionComponent } from '../dialog-connexion/dialog-connexion.component';
import { DialogInscriptionComponent } from '../dialog-inscription/dialog-inscription.component';
import { AuthService } from '../shared/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialogConnexion: MdDialog, public dialogInscription: MdDialog, private authService: AuthService) { }

  ngOnInit() {
  }

  openDialogInscription() {
    this.dialogInscription.open(DialogInscriptionComponent);
  }
  openDialogConnexion() {
    this.dialogConnexion.open(DialogConnexionComponent);
  }

}
