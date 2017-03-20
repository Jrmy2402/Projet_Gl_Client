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
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user';
import { DialogConnexionComponent } from '../dialog-connexion/dialog-connexion.component';


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
  public snackBar: MdSnackBar,
  public dialogConnexion: MdDialog) {

  }
  ngOnInit() {
  }
  Inscription(form: NgForm) {
    if (form.value.password !== form.value.password_conf){
      this.error = 'Passwords do not match.';
    } else {
      this.user = {
          lastname: form.value.nom,
          firstname: form.value.prenom,
          email: form.value.email,
          password: form.value.password
      };
      this.authService.addUser(this.user)
        .subscribe(data => {
          console.log('Respond', data);
          this.snackBar.open('Sign up succeed', 'ok', {
            duration: 9000,
          });
          this.dialogRef.close();
        }, error => {
          console.log('Respond', error);
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
      return 'This field is required.';
    } else if (!this.validateEmail(this.email)) {
      return 'Please enter a valid e-mail.';
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  showDialogConnexion() {
    this.dialogRef.close();
    this.dialogConnexion.open(DialogConnexionComponent);
  }

}
