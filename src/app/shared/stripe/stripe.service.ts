import {
  Injectable,
  OnInit
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';

@Injectable()
export class StripeService {

  constructor() {
    // Stripe.setPublishableKey('pk_test_7aIkn0pnuk0t1P7XTKRumIuY');
  }

  getToken() {
    return Observable.create((observer: any) => {
      const handler = StripeCheckout.configure({
        key: 'pk_test_7aIkn0pnuk0t1P7XTKRumIuY',
        locale: 'auto',
        token: function (token: any) {
           observer.next(token.id);
           observer.complete();
        }
      });

      handler.open({
        name: 'VMRS',
        description: '2 widgets',
        email: 'jeremy.spriet@gmail.com',
        allowRememberMe: false,
        // zipCode: true,
        currency: 'eur',
        amount: 2000
      });

      window.addEventListener('popstate', function () {
        handler.close();
      });
    });
  }

}
