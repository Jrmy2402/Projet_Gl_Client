import {
  Component,
  OnInit,
  Renderer
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef,
  MdSnackBar
} from '@angular/material';
import {
  VmService
} from '../shared/vm/vm.service';
import {
  StripeService
} from '../shared/stripe/stripe.service';
import {
  Application
} from './appli.interface';
import {
  Catalog
} from './catalog.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-add-vm',
  templateUrl: './page-add-vm.component.html',
  styleUrls: ['./page-add-vm.component.scss']
})
export class PageAddVmComponent implements OnInit {

  globalListener: any;
  distribution: string;
  applicationschoose: Array < string > = [];
  catalogs: Array < Catalog > = [];
  applications: Array < Application > = [];


  constructor(private vmService: VmService,
    public dialogCard: MdDialog,
    private renderer: Renderer,
    private stripeService: StripeService,
    public snackBar: MdSnackBar,
    private router: Router
  ) {}

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

  checkboxFolders(name: string, event: any) {
    for (const elt of this.catalogs) {
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

  saveVm(token: any) {
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
    console.log(this.distribution, this.applicationschoose);
    this.vmService.addVM(this.distribution, this.applicationschoose, token)
      .subscribe(data => {
        console.log('Réponse', data);
        this.applicationschoose = [];
        this.snackBar.open('Payement : Réussi, la vm sera disponible dans quelques minutes', 'ok', {
          duration: 9000,
        });
        this.router.navigate(['accesVm']);
      }, error => {
        console.log('Réponse', error);
        this.applicationschoose = [];
        this.snackBar.open('Erreur : Payement, veuillez réessayer', 'ok', {
          duration: 9000,
        });
      });
  }

  addVM() {
    this.stripeService.getToken()
      .subscribe(
        (data: any) => this.saveVm(data),
        (err: any) => console.error(err),
        () => console.log('fini')
      );
  }

}
