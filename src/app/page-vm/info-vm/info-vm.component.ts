import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { InfoVm } from './info-vm.interface';
import {
  VmService
} from '../../shared/vm/vm.service';

@Component({
  selector: 'app-info-vm',
  templateUrl: './info-vm.component.html',
  styleUrls: ['./info-vm.component.scss']
})
export class InfoVmComponent implements OnInit {

  myVM: InfoVm;
  load: Boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private vmService: VmService ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let Id = params['id'];
      console.log(Id);
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
}
