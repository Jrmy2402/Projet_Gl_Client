import { Component, OnInit } from '@angular/core';
import { VmService } from '../../../shared/vm/vm.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-vm-user',
  templateUrl: './list-vm-user.component.html',
  styleUrls: ['./list-vm-user.component.scss']
})
export class ListVmUserComponent implements OnInit {

  listVM: Array < string > = [];
  infoUser: any = {};
  load: Boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private vmService: VmService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const Id = params['id'];
      console.log(Id);
      this.vmService.getVmByUser(Id).subscribe(data => {
        console.log(data);
        this.infoUser = data;
        if(data.Vms) {
          for (const tab of data.Vms){
            console.log(tab);
            this.listVM.push(tab);
          }
        }
      });
      this.load = false;
    });
  }
}