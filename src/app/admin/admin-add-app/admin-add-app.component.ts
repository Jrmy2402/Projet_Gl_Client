import {
  Component,
  OnInit
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';
import {
  VmService
} from '../../shared/vm/vm.service';
import {
  DialogConfirmationComponent
} from '../../shared/dialog-confirmation/dialog-confirmation.component';
@Component({
  selector: 'app-admin-add-app',
  templateUrl: './admin-add-app.component.html',
  styleUrls: ['./admin-add-app.component.scss']
})
export class AdminAddAppComponent implements OnInit {

  listApplication: Array < any > = [];
  selectedOption: string;

  constructor(private vmService: VmService, public dialogConfirmation: MdDialog) {}

  ngOnInit() {
    this.vmService.getApplication().subscribe(data => {
      console.log(data);
      for (const d of data) {
        this.listApplication.push(d);
      }
      //this.listTurnkey=data;
    }, error => {
      console.log('Réponse', error);
    });
  }
  openDialog(id: any) {
    const dialogRef = this.dialogConfirmation.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'YES') {
        this.destroyApplication(id);
      }
      console.log(this.selectedOption);
    });
  }
  destroyApplication(Id: string) {
    this.vmService.destroyApplication(Id).subscribe(data => {
      console.log(data);
      this.listApplication = this.listApplication.filter(d => {
        return d._id !== Id;
      });
    }, err => console.log(err));
  }
}
