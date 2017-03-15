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
  selector: 'app-admin-add-vm',
  templateUrl: './admin-add-vm.component.html',
  styleUrls: ['./admin-add-vm.component.scss']
})
export class AdminAddVmComponent implements OnInit {
listApplication: Array < any > = [];
  selectedOption: string;

  constructor(private vmService: VmService, public dialogConfirmation: MdDialog) {}

  ngOnInit() {
    this.vmService.getCatalog().subscribe(data => {
      console.log(data);
      for (const d of data) {
        this.listApplication.push(d);
      }
    }, error => {
      console.log('Réponse', error);
    });
  }
  openDialog(id: any) {
    let dialogRef = this.dialogConfirmation.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'YES') {
        this.destroyCatalog(id);
      }
      console.log(this.selectedOption);
    });
  }
  destroyCatalog(Id: string) {
    this.vmService.destroyCatalog(Id).subscribe(data => {
      console.log(data);
    }, err => console.log(err));
  }
}
