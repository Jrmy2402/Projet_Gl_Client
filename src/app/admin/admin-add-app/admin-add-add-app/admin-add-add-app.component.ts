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
    this.vmService.postApplication(this.name, this.info, this.RunCmd).subscribe(data => {
      console.log(data);
    }, err => console.log(err));
  }
}