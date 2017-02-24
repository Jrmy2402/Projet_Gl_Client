import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';
import 'rxjs/add/observable/throw';

@Injectable()
export class VmService {

  private vmUrl = 'api/users/addvm';  // URL to web API
  private socket;

  constructor (private http: Http, private router: Router) {}

  addVM (distribution: string, application: Array<string>, tokenCard: any): Observable< any > {
    debugger
    const token = localStorage.getItem('token');
    if (token) {
      const options = {
        headers: new Headers()
      };
      options.headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.vmUrl, {distribution, application, tokenCard}, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  getApplication (): Observable< any > {
    const token = localStorage.getItem('token');
    if (token) {
      const options = {
        headers: new Headers()
      };
      options.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get('api/applis', options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  getCatalog (): Observable< any > {
    const token = localStorage.getItem('token');
    if (token) {
      const options = {
        headers: new Headers()
      };
      options.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get('api/catalogs', options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  getMyVm (): Observable< any > {
    const token = localStorage.getItem('token');
    if (token) {
      const options = {
        headers: new Headers()
      };
      options.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get('api/users/meVm', options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  getInfoVm (id: string): Observable< any > {
    const token = localStorage.getItem('token');
    if (token) {
      const options = {
        headers: new Headers()
      };
      options.headers.set('Authorization', `Bearer ${token}`);
      return this.http.get(`api/users/meVm/${id}`, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  getInfoVmSocket() {
    // const observable = new Observable(observer => {
      // const host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/sock';
      this.socket = io.connect('http://localhost:9000');
      // debugger
    //   this.socket.on('infoVm', (data) => {
    //     observer.next(data);
    //   });
    //   return () => {
    //     this.socket.disconnect();
    //   };
    // });
    // return observable;
  }

  private extractData(res: Response) {
    const body = res.json();
    // localStorage.setItem('token', body.token);
    return body.data || body;
  }

  private handleError (error: Response | any) {
    // localStorage.removeItem('token');
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

