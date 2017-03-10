import {
  Component,
  OnInit
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef < DialogConfirmationComponent >) {

  }
  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
