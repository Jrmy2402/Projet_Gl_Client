import { Component, OnInit } from '@angular/core';
import {
  VmService
} from '../shared/vm/vm.service';

@Component({
  selector: 'app-page-vm',
  templateUrl: './page-vm.component.html',
  styleUrls: ['./page-vm.component.scss']
})
export class PageVmComponent implements OnInit {

  //myVM = Array < String > 
  myVM: Array < string > = [];
  load: Boolean = true;
  // [
  //   {
  //     name: 'Node.js',
  //     ip: 'Tototootot',
  //   },
  //   {
  //     name: 'Mongodb',
  //     ip: 'xfjiiojij',
  //   },
  //   {
  //     name: 'PostgreSQL',
  //     ip: 'xfjiiojij',
  //   }];

  constructor(private vmService: VmService) { }

  ngOnInit() {
    this.vmService.getMyVm().subscribe(data => {
      for (const tab of data){
        console.log(tab);
        this.myVM.push(tab);
      }
      this.load = false;
    }, err => console.log(err));
  }

}
