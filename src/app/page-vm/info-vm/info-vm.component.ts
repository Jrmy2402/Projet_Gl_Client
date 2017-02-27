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
  InfoVm
} from './info-vm.interface';
import {
  VmService
} from '../../shared/vm/vm.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-info-vm',
  templateUrl: './info-vm.component.html',
  styleUrls: ['./info-vm.component.scss']
})
export class InfoVmComponent implements OnInit, OnDestroy {

  myVM: any;
  load: Boolean = true;
  public connection;

  constructor(private activatedRoute: ActivatedRoute, private vmService: VmService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const Id = params['id'];
      console.log(Id);
      this.connection = this.vmService.getInfoVmSocket(Id).subscribe(data => {
        console.log(data);
        this.myVM = data;
      });
      // this.vmService.getInfoVm(Id).subscribe(data => {
      //   this.myVM = data.stats;
      //   console.log(this.myVM);
      //   // for (const tab of data){
      //   //   console.log(tab);
      //   //   this.myVM.push(tab);
      //   // }
      //   this.load = false;
      // }, err => console.log(err));
    });
  }

  startVM (Id:string) {
    this.vmService.startVm(Id).subscribe(data => {
      console.log(data);
    }, err => console.log(err));
  }

  stopVM (Id:string) {
    this.vmService.stopVm(Id).subscribe(data => {
      console.log(data);
    }, err => console.log(err));
  }

  removeVM (Id:string) {
    this.vmService.removeVm(Id).subscribe(data => {
      console.log(data);
    }, err => console.log(err));
  }

  ngOnDestroy () {
    this.connection.unsubscribe();
    // this.socket.unsubscribe();
  }
}
