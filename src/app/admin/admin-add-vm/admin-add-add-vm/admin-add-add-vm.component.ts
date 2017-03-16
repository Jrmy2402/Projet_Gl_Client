import {
  Component,
  OnInit
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef,
  MdSnackBar
} from '@angular/material';
import {
  VmService
} from '../../../shared/vm/vm.service';
import {
  Router
} from '@angular/router';
@Component({
  selector: 'app-admin-add-add-vm',
  templateUrl: './admin-add-add-vm.component.html',
  styleUrls: ['./admin-add-add-vm.component.scss']
})
export class AdminAddAddVmComponent implements OnInit {

 constructor(private vmService: VmService, public snackBar: MdSnackBar, private router: Router) {}

  name: string;
  info: string;
  FromCmd: string;

  ngOnInit() {

  }

  postCatalog() {
    if(this.name && this.info && this.FromCmd){
      this.vmService.postCatalog(this.name, this.info, this.FromCmd).subscribe(data => {
        console.log(data);
        this.router.navigate(['admin/manageOS']);
        this.snackBar.open('OS successfully added', 'ok', {
          duration: 9000,
        });
      }, err => {
          console.log('Respond', err);
          this.snackBar.open('Error : OS not created', 'ok', {
            duration: 9000,
          });
      });
    } else {
      this.snackBar.open('Error : You must choose a name, an information and a command line !', 'ok', {
      duration: 9000,
      });
    }
  }
}
