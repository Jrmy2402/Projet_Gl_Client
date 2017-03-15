import {
  Component,
  OnInit
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef,
  MdSnackBar
} from '@angular/material';
import {
  VmService
} from '../../../shared/vm/vm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-add-turnkey',
  templateUrl: './admin-add-add-turnkey.component.html',
  styleUrls: ['./admin-add-add-turnkey.component.scss']
})

export class AdminAddAddTurnkeyComponent implements OnInit {

  constructor(private vmService: VmService, public snackBar: MdSnackBar, private router: Router) {}

  distribution: string;
  info: string;
  applicationschoose: Array < string > = [];

  catalogs: Array < any > = [];
  applications: Array < any > = [];

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
  }

  checkboxFolders(name: string, event: any) {
    for (const elt of this.catalogs) {
      if (elt.name === name) {
        elt.checked = !elt.checked;
      } else {
        elt.checked = false;
      }
    }
  }

  stopPropagationFolders(name: string, event: any, value: boolean) {
    this.stopPropagation(event);
    for (const elt of this.catalogs) {
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

  checkboxApplications(name: string, event: any) {
    for (const elt of this.applications) {
      if (elt.name === name) {
        elt.checked = !elt.checked;
      }
    }
  }

   saveTurnkey() {
    for (const elt of this.catalogs) {
      if (elt.checked === true) {
        this.distribution = elt.name;
      }
    }
    for (const elt of this.applications) {
      if (elt.checked === true) {
        this.applicationschoose.push(elt.name);
      }
    }
    if(this.distribution && this.info){
      console.log(this.distribution, this.applicationschoose);
      debugger
      this.vmService.postTurnkey(this.distribution, this.info, this.applicationschoose)
        .subscribe(data => {
          console.log('Réponse', data);
          this.snackBar.open('Turnkey Configuration successfully created', 'ok', {
            duration: 9000,
          });
          this.router.navigate(['admin/manageTurnkey']);
        }, error => {
          console.log('Réponse', error);
          this.applicationschoose = [];
          this.snackBar.open('Error : Turnkey Configuration not created', 'ok', {
            duration: 9000,
          });
        });
    } else {
       this.snackBar.open('Error : You must choose a name and a distribution to confirm', 'ok', {
            duration: 9000,
          });
    }

  }
}
