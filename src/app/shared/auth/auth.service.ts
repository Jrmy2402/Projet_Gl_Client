import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/observable/throw';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  private authUrl = 'api/users';  // URL to web API
  jwtHelper: JwtHelper = new JwtHelper();
  redirectUrl: string;
  role: string;

  constructor (private http: Http, private router: Router) {}

  addUser (user: User): Observable< any > {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
     return this.http.post(this.authUrl, {user})
        .map(this.extractData)
        .catch(this.handleError);
  }

  login (email: string, password: string): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post('auth/local', { email, password }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  isLogged () {
      return tokenNotExpired('token');
  }

  userRole () {
      const token = localStorage.getItem('token');
      if (token) {
        this.role = this.jwtHelper.decodeToken(token).role;
        return this.role;
      }
  }

  isAdmin () {
      const role = this.userRole();
      return role === 'admin' ? true : false;
  }

  isInAdmin () {
    const route = this.router.url;
    return route.includes('/admin');
  }

  disconnect () {
      localStorage.removeItem('token');
      this.router.navigate(['home']);
  }

  private extractData(res: Response) {
    const body = res.json();
    localStorage.setItem('token', body.token);
    return body.data || { };
  }

  private handleError (error: Response | any) {
    localStorage.removeItem('token');
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.errors || JSON.stringify(body);
      if (err.email.message) {
        errMsg = err.email.message;
      } else {
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
