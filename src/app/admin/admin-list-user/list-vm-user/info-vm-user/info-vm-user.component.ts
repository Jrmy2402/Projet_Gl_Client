import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Router,
  Params,
  ActivatedRoute
} from '@angular/router';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';
import {
  DialogConfirmationComponent
} from '../../../../shared/dialog-confirmation/dialog-confirmation.component';
import {
  VmService
} from '../../../../shared/vm/vm.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-info-vm-user',
  templateUrl: './info-vm-user.component.html',
  styleUrls: ['./info-vm-user.component.scss']
})
export class InfoVmUserComponent implements OnInit, OnDestroy {

  myVM: any;
  load: Boolean = true;
  load_circle: Boolean = false;
  start: Boolean = false;
  stop: Boolean = false;
  public connection;
  cpu: number;
  OS: string;
  name: string;
  selectedOption: string;

  constructor(private activatedRoute: ActivatedRoute, private vmService: VmService, private router: Router, public dialogConfirmation: MdDialog) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const Id = params['id'];
      console.log(Id);
      this.connection = this.vmService.getInfoVmSocket(Id).subscribe(data => {
        console.log(data);
        this.myVM = data;
        // if (this.load === true) {
          if (this.myVM.info === 'On') {
            this.start = false;
            this.stop = true;
          } else {
            this.start = true;
            this.stop = false;
          }
        // }
        this.load = false;
      });
    });
  }

  startVM (Id: string) {
    this.load_circle = true;
    // this.stop = true;
    this.vmService.startVm(Id).subscribe(data => {
      console.log(data);
      setTimeout(() => {
        this.load_circle = false;
      }, 3000);
      // this.start = false;
    }, err => console.log(err));
  }

  stopVM (Id: string) {
    this.load_circle = true;
    // this.start = true;
    this.vmService.stopVm(Id).subscribe(data => {
      console.log(data);
      setTimeout(() => {
        this.load_circle = false;
      }, 3000);
      // this.stop = false;
    }, err => console.log(err));
  }

  openDialog(id: any) {
    const dialogRef = this.dialogConfirmation.open(DialogConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
      if (this.selectedOption === 'YES') {
        this.removeVM(id);
      }
      console.log(this.selectedOption);
    });
  }
  removeVM (Id: string) {
    this.load_circle = true;
    this.vmService.removeVm(Id).subscribe(data => {
      console.log(data);
      this.router.navigate(['admin/listUser']);
    }, err => console.log(err));
  }

  ngOnDestroy () {
    this.connection.unsubscribe();
  }
}
