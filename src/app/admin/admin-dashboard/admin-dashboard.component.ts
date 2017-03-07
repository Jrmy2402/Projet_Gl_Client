import { Component, OnInit } from '@angular/core';

import {
  VmService
} from '../../shared/vm/vm.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  DashBoardView: Array < any > = [];

  constructor(private vmService: VmService) {}

  ngOnInit() {
    this.vmService.getDashboard().subscribe(data => {
      console.log(data);
      for (const d of data) {
        this.DashBoardView.push(d);
      }
      //this.listTurnkey=data;
    }, error => {
      console.log('Réponse', error);
    });
  }
}