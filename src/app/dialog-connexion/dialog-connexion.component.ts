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
  AuthService
} from '../auth/auth.service';


@Component({
  selector: 'app-dialog-connexion',
  templateUrl: './dialog-connexion.component.html',
  styleUrls: ['./dialog-connexion.component.scss']
})
export class DialogConnexionComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor(public dialogRef: MdDialogRef < DialogConnexionComponent >,
  private authService: AuthService,
  public snackBar: MdSnackBar) {}

  ngOnInit() {}

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

  connexion() {
    this.authService.login(this.email, this.password)
      .subscribe(data => {
        console.log('Réponse', data);
        this.snackBar.open('Connexion réussie', 'ok', {
          duration: 9000,
        });
        this.dialogRef.close();
      }, error => {
        console.log('Réponse', error);
        this.error = error;
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
