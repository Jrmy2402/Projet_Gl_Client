import { Component, OnInit, Input } from '@angular/core';
import {
  MdDialog,
  MdDialogRef,
  MdSnackBar
} from '@angular/material';
import {
  VmService
} from '../../shared/vm/vm.service';
import {
  StripeService
} from '../../shared/stripe/stripe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vm-turnkey',
  templateUrl: './add-vm-turnkey.component.html',
  styleUrls: ['./add-vm-turnkey.component.scss']
})
export class AddVmTurnkeyComponent implements OnInit {

  @Input() listTurnkey: Array < any > = [];

  distribution: string;
  applicationschoose: Array < string > = [];

  constructor(private vmService: VmService,
    public dialogCard: MdDialog,
    private stripeService: StripeService,
    public snackBar: MdSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('listTurnkey :', this.listTurnkey);
  }

   stopPropagationFolders(_id: string, event: any, value: boolean) {
    this.stopPropagation(event);
    for (const elt of this.listTurnkey) {
      if (elt._id !== _id) {
        elt.checked = false;
      } else {
        elt.checked = value;
      }
    }
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }

  checkboxFolders(_id: string, event: any) {
    for (const elt of this.listTurnkey) {
      if (elt._id === _id) {
        elt.checked = !elt.checked;
      } else {
        elt.checked = false;
      }
    }
  }

    saveVm(token: any) {
      for (const elt of this.listTurnkey) {
        if (elt.checked === true) {
          this.distribution = elt.distribution;
          this.applicationschoose=elt.application;
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
