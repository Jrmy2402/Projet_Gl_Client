import { Component, OnInit } from '@angular/core';
import {
  MdDialog,
  MdDialogRef,
  MdSnackBar
} from '@angular/material';
import {
  VmService
} from '../../../shared/vm/vm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-add-app',
  templateUrl: './admin-add-add-app.component.html',
  styleUrls: ['./admin-add-add-app.component.scss']
})
export class AdminAddAddAppComponent implements OnInit {

  constructor(private vmService: VmService, public snackBar: MdSnackBar, private router: Router) {}

  name: String;
  info: String;
  RunCmd: String;

  ngOnInit() {

  }
 
 postApplication() {
    if(this.name && this.info && this.RunCmd){
      this.vmService.postApplication(this.name, this.info, this.RunCmd).subscribe(data => {
        console.log(data);
        this.snackBar.open('Application successfully added', 'ok', {
          duration: 9000,
        });
      }, err => {
          console.log('Réponse', err);
          this.snackBar.open('Error : Application not created', 'ok', {
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