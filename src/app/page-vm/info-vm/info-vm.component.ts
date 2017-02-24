import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { InfoVm } from './info-vm.interface';
import {
  VmService
} from '../../shared/vm/vm.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-info-vm',
  templateUrl: './info-vm.component.html',
  styleUrls: ['./info-vm.component.scss']
})
export class InfoVmComponent implements OnInit {

  myVM: InfoVm;
  load: Boolean = true;
  public socket;

  constructor(private activatedRoute: ActivatedRoute, private vmService: VmService ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const Id = params['id'];
      console.log(Id);
      // this.connection =
      this.socket = io({ 'path': '/sock' });
      this.socket.emit('statsVm', Id);
      // this.socket.emit('statsVm', 'message2');
      // this.vmService.getInfoVmSocket();
      // .subscribe(message => {
      //   console.log(message);
      //   // this.messages.push(message);
      // });
      this.vmService.getInfoVm(Id).subscribe(data => {
        this.myVM = data.stats;
        console.log(this.myVM);
        // for (const tab of data){
        //   console.log(tab);
        //   this.myVM.push(tab);
        // }
        this.load = false;
      }, err => console.log(err));
    });
  }

  // ngOnDestroy () {
  //   this.connection.unsubscribe();
  // }
}
