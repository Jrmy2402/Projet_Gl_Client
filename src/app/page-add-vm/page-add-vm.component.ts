import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-add-vm',
  templateUrl: './page-add-vm.component.html',
  styleUrls: ['./page-add-vm.component.scss']
})
export class PageAddVmComponent implements OnInit {

  distribution: string;
  folders = [
    {
      name: 'Debian',
      description: 'Tototootot',
      checked: false,
    },
    {
      name: 'Ubuntu',
      description: 'xfjiiojij',
      checked: false,
    }
  ];
  applications = [
    {
      name: 'Node.js',
      description: 'Tototootot',
      checked: false,
    },
    {
      name: 'Mongodb',
      description: 'xfjiiojij',
      checked: false,
    },
    {
      name: 'PostgreSQL',
      description: 'xfjiiojij',
      checked: false,
    }];

  constructor() { }

  ngOnInit() {
  }

  stopPropagationFolders(name: string, event: any, value: boolean) {
    this.stopPropagation(event);
    for (const elt of this.folders) {
      if (elt.name !== name) {
        elt.checked = false;
      } else {
        elt.checked = value;
      }
    }
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }

  checkboxFolders(name: string, event: any) {
    for (const elt of this.folders) {
      if (elt.name === name) {
        elt.checked = !elt.checked;
      } else {
        elt.checked = false;
      }
    }
  }

  checkboxApplications(name: string, event: any) {
    for (const elt of this.applications) {
      if (elt.name === name) {
        elt.checked = !elt.checked;
      }
    }
  }

  addVM() {
    for (const elt of this.folders) {
      if (elt.checked === true) {
        this.distribution = elt.name;
      } 
    }
    for (const elt of this.applications) {
      if (elt.checked === true) {
        this.distribution = elt.name;
      } 
    }

  }

}
