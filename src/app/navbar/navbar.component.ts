import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogInscriptionComponent } from '../dialog-inscription/dialog-inscription.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // dialogRef: MdDialogRef<DialogInscriptionComponent>;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialogInscription() {
    let dialogRef = this.dialog.open(DialogInscriptionComponent);
    dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
    });
  }

}
