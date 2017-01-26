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
  NgForm
} from '@angular/forms';
import { AuthService } from '../shared/auth/auth.service';
import { User } from '../shared/auth/user';

@Component({
  selector: 'app-dialog-inscription',
  templateUrl: './dialog-inscription.component.html',
  styleUrls: ['./dialog-inscription.component.scss'],
})
export class DialogInscriptionComponent implements OnInit {

  nom: string;
  prenom: string;
  email: string;
  password: string;
  password_conf: string;
  error: string;
  user: User;

  constructor(public dialogRef: MdDialogRef < DialogInscriptionComponent >,
  private authService: AuthService,
  public snackBar: MdSnackBar) {

  }
  ngOnInit() {
  }
  Inscription(form: NgForm) {
    if (form.value.password !== form.value.password_conf){
      this.error = 'Les mot de passe ne correspondent pas.';
    } else {
      this.user = {
          lastname: form.value.nom,
          firstname: form.value.prenom,
          email: form.value.email,
          password: form.value.password
      };
      this.authService.addUser(this.user)
        .subscribe(data => {
          console.log('Réponse', data);
          this.snackBar.open('Inscription réussie', 'ok', {
            duration: 9000,
          });
          this.dialogRef.close();
        }, error => {
          console.log('Réponse', error);
          this.error = error;
        });
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
