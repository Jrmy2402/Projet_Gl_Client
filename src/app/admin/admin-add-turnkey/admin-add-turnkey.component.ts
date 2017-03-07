import { Component, OnInit } from '@angular/core';

import {
  VmService
} from '../../shared/vm/vm.service';

@Component({
  selector: 'app-admin-add-turnkey',
  templateUrl: './admin-add-turnkey.component.html',
  styleUrls: ['./admin-add-turnkey.component.scss']
})
export class AdminAddTurnkeyComponent implements OnInit {

listTurnkey: Array < any > = [];

  constructor(private vmService: VmService) {}

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


}
