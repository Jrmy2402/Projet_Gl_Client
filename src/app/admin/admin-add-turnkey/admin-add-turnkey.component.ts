import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogConfirmationComponent } from '../../shared/dialog-confirmation/dialog-confirmation.component';
import { VmService } from '../../shared/vm/vm.service';

@Component({
  selector: 'app-admin-add-turnkey',
  templateUrl: './admin-add-turnkey.component.html',
  styleUrls: ['./admin-add-turnkey.component.scss']
})
export class AdminAddTurnkeyComponent implements OnInit {

listTurnkey: Array < any > = [];
selectedOption: string;

  constructor(private vmService: VmService, public dialogConfirmation: MdDialog) {}

  ngOnInit() {
    this.vmService.getTurnkey().subscribe(data => {
      console.log(data);
      for (const d of data) {
        this.listTurnkey.push(d);
      }
      //this.listTurnkey=data;
    }, error => {
      console.log('Réponse', error);
    });
  }
  openDialog(id : any) {
    let dialogRef = this.dialogConfirmation.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption==='YES') {
        this.destroyTurnkey(id);
      }
      console.log(this.selectedOption);
    });
  }
  destroyTurnkey(Id: string) {
    this.vmService.destroyTurnkey(Id).subscribe(data => {
      console.log(data);
    }, err => console.log(err));
  }
}

