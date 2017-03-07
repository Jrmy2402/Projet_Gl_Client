import {
  Component,
  OnInit,
} from '@angular/core';
import {
  VmService
} from '../shared/vm/vm.service';
import {
  Application
} from './appli.interface';
import {
  Catalog
} from './catalog.interface';

@Component({
  selector: 'app-page-add-vm',
  templateUrl: './page-add-vm.component.html',
  styleUrls: ['./page-add-vm.component.scss']
})
export class PageAddVmComponent implements OnInit {

  catalogs: Array < Catalog > = [];
  applications: Array < Application > = [];
  listTurnkey: Array < any > = [];

  constructor(private vmService: VmService) {}

  ngOnInit() {
    this.vmService.getApplication().subscribe(data => {
      for (const d of data) {
        this.applications.push(d);
      }
    }, error => {
      console.log('Réponse', error);
    });
    this.vmService.getCatalog().subscribe(data => {
      for (const d of data) {
        this.catalogs.push(d);
      }
    }, error => {
      console.log('Réponse', error);
    });
    this.vmService.getTurnkey().subscribe(data => {
      console.log(data);
      for (const d of data) {
        this.listTurnkey.push(d);
      }
      //this.listTurnkey=data;
    }, error => {
      console.log('Réponse', error);
    });
  }

}
