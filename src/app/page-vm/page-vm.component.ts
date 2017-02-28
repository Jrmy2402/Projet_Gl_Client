import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  VmService
} from '../shared/vm/vm.service';

@Component({
  selector: 'app-page-vm',
  templateUrl: './page-vm.component.html',
  styleUrls: ['./page-vm.component.scss']
})
export class PageVmComponent implements OnInit, OnDestroy {

  myVM: Array < string > = [];
  load: Boolean = true;
  public connection;

  constructor(private vmService: VmService) { }

  ngOnInit() {
    this.vmService.getMyVm().subscribe(data => {
      for (const tab of data){
        console.log(tab);
        this.myVM.push(tab);
      }
      this.load = false;
    }, err => console.log(err));
    this.connection = this.vmService.getVmSocket().subscribe(data => {
      this.myVM = [];
      for (const tab of data){
        console.log(tab);
        this.myVM.push(tab);
      }
    });
  }

  ngOnDestroy () {
    this.connection.unsubscribe();
  }

}
