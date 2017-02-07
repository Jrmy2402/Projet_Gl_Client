import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-vm',
  templateUrl: './page-vm.component.html',
  styleUrls: ['./page-vm.component.scss']
})
export class PageVmComponent implements OnInit {

  myVM = [
    {
      name: 'Node.js',
      ip: 'Tototootot',
      checked: false,
    },
    {
      name: 'Mongodb',
      ip: 'xfjiiojij',
      checked: false,
    },
    {
      name: 'PostgreSQL',
      ip: 'xfjiiojij',
      checked: false,
    }];

  constructor() { }

  ngOnInit() {
  }

}
