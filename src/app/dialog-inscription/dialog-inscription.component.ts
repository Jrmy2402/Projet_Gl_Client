import {
  Component,
  OnInit
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef
} from '@angular/material';
import {
  NgForm
} from '@angular/forms';


@Component({
  selector: 'app-dialog-inscription',
  templateUrl: './dialog-inscription.component.html',
  styleUrls: ['./dialog-inscription.component.scss']
})
export class DialogInscriptionComponent implements OnInit {

  nom: string;
  prenom: string;
  email: string;
  password: string;
  password_conf: string;
  error: string;

  constructor(public dialogRef: MdDialogRef < DialogInscriptionComponent > ) {

  }
  ngOnInit() {
  }
  Inscription(form: NgForm) {
    // console.log(form.value);
    if (form.value.password !== form.value.password_conf){
      this.error = 'Les mot de passe ne correspondent pas.';
    } else {

    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }

  errorMessageEmail() {
    // console.log(this.email);
    if (this.email === '' || this.email === undefined) {
      return 'Ce champ est obligatoire.';
    } else if (!this.validateEmail(this.email)) {
      return 'Veuillez saisir une adresse e-mail valide.';
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
