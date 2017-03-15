import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  VmService
} from '../../shared/vm/vm.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy  {

  DashBoardView: any = {};
  public connection;
  cpuOs: any;
  free: any;
  total: any;


  constructor(private vmService: VmService) {}

  ngOnInit() {
    this.vmService.getDashboard().subscribe(data => {
      console.log(data);
      this.DashBoardView = data[0];
    }, error => {
      console.log('Réponse', error);
    });
    this.connection = this.vmService.getInfoOs().subscribe(data => {
      console.log(data);
      if (data.dataOSCPU) {
        this.cpuOs = data.dataOSCPU;
      } else {
        this.free = data.dataOSMemory.free;
        this.total = data.dataOSMemory.total;
      }
    });
  }

  ngOnDestroy () {
    this.connection.unsubscribe();
  }
}
