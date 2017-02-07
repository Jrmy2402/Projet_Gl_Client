/*import {
  Component,
  OnInit,
  NgZone,
  Renderer
} from '@angular/core';
import {
  MdDialog,
  MdDialogRef,
  MdSnackBar
} from '@angular/material';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';


@Component({
  moduleId: module.id,
  selector: 'app-dialog-payment',
  templateUrl: './dialog-payment.component.html',
  styleUrls: ['./dialog-payment.component.scss']
})
export class DialogPaymentComponent implements OnInit {

  formGroupCard: FormGroup;

  message: string;
  globalListener: any;


  handler = ( < any > window).StripeCheckout.configure({
    key: 'pk_test_7aIkn0pnuk0t1P7XTKRumIuY',
    locale: 'auto',
    token: function (token: any) {
      debugger
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
    }
  });

  constructor(public dialogRef: MdDialogRef < DialogPaymentComponent > , private _zone: NgZone,
    public fb: FormBuilder, private renderer: Renderer) {
    // Stripe.setPublishableKey('pk_test_oi0sKPJYLGjdvOXOM8tE8cMa');
  }

  ngOnInit() {
    Stripe.setPublishableKey('pk_test_7aIkn0pnuk0t1P7XTKRumIuY');
    this.formGroupCard = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20)]],
      expiryMonth: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      expiryYear: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getToken(e: any) {
    console.log(this.formGroupCard);
    this.message = 'Loading...';
    // debugger

    Stripe.card.createToken({
      number: this.formGroupCard.value.cardNumber,
      exp_month: this.formGroupCard.value.expiryMonth,
      exp_year: this.formGroupCard.value.expiryYear,
      cvc: this.formGroupCard.value.cvc
    }, (status: number, response: any) => {
      // debugger
      // console.log(response, status);
      // // Wrapping inside the Angular zone
      this._zone.run(() => {
      //   debugger
        if (status === 200) {
          this.message = `Success! Card token ${response.card.id}.`;
        } else {
          this.message = response.error.message;
        }
      });
    });
  }

}*/
