import {
  Component,
  OnInit,
  Renderer
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';
import {
  VmService
} from '../shared/vm/vm.service';
import {
  StripeService
} from '../shared/stripe/stripe.service';

@Component({
  selector: 'app-page-add-vm',
  templateUrl: './page-add-vm.component.html',
  styleUrls: ['./page-add-vm.component.scss']
})
export class PageAddVmComponent implements OnInit {

  globalListener: any;
  distribution: string;
  applicationschoose: Array < string > = [];
  folders = [{
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
  applications = [{
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
    }
  ];

  constructor(private vmService: VmService,
    public dialogCard: MdDialog,
    private renderer: Renderer,
    private stripeService: StripeService
  ) {}

  ngOnInit() {}

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

  saveVm(token: any) {
    for (const elt of this.folders) {
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
    debugger
    this.vmService.addVM(this.distribution, this.applicationschoose, token)
      .subscribe(data => {
        console.log('Réponse', data);
        // this.snackBar.open('Inscription réussie', 'ok', {
        //   duration: 9000,
        // });
        // this.dialogRef.close();
      }, error => {
        console.log('Réponse', error);
        // this.error = error;
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
