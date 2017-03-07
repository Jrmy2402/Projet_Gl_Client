import { Component, OnInit } from '@angular/core';

import {
  VmService
} from '../../shared/vm/vm.service';

@Component({
  selector: 'app-admin-list-user',
  templateUrl: './admin-list-user.component.html',
  styleUrls: ['./admin-list-user.component.scss']
})
export class AdminListUserComponent implements OnInit {

  listUser: any;

  constructor(private vmService: VmService) {}

  ngOnInit() {
    this.vmService.getAdminUser().subscribe(data => {
      console.log(data);
      this.listUser=data;
    }, error => {
      console.log('Réponse', error);
    });
  }

}
