import {
  Injectable,
  OnInit
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import { AuthService } from 'app/shared/auth/auth.service';

@Injectable()
export class StripeService {

  constructor(public authService: AuthService) {
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

      this.authService.getMeInfo().subscribe(data => {
        handler.open({
          name: 'VMRS',
          description: 'By VM',
          email: data.email,
          allowRememberMe: false,
          // zipCode: true,
          currency: 'eur',
          amount: 500
        });

        window.addEventListener('popstate', function () {
          handler.close();
        });
      });


    });
  }

}
