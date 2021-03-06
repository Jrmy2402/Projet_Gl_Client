import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams
} from '@angular/http';
import {
  Observable
} from 'rxjs/Observable';
import {
  Router
} from '@angular/router';
import {
  AuthHttp
} from 'angular2-jwt';
import * as io from 'socket.io-client';
import 'rxjs/add/observable/throw';

@Injectable()
export class VmService {

  private vmUrl = 'api/users/addvm'; // URL to web API
  private socket;

  constructor(private http: Http, private router: Router, public authHttp: AuthHttp) {}

  addVM(distribution: string, application: Array < string > , tokenCard: any): Observable < any > {
    return this.authHttp.post('api/users/addvm', {
        distribution,
        application,
        tokenCard
      })
      .map(this.extractData)
      .catch(this.handleError);
    // const token = localStorage.getItem('token');
    // if (token) {
    //   const options = {
    //     headers: new Headers()
    //   };
    //   options.headers.set('Authorization', `Bearer ${token}`);
    //   return this.http.post(this.vmUrl, {distribution, application, tokenCard}, options)
    //     .map(this.extractData)
    //     .catch(this.handleError);
    // }
  }

  //Turnkey---------------------------------------------------------------------------------------------
  postTurnkey(distribution: string, info: string, application: Array < string > ): Observable < any > {
    return this.authHttp.post('api/turnkeys', {
        distribution,
        info,
        application
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTurnkey(): Observable < any > {
    return this.authHttp.get(`api/turnkeys/`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  destroyTurnkey(id: string): Observable < any > {
    return this.authHttp.delete(`api/turnkeys/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  // Catalog---------------------------------------------------------------------------------------------
  postCatalog(name: string, info: string, FromCmd: String): Observable < any > {
    return this.authHttp.post('api/catalogs', {
        name,
        info,
        FromCmd
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCatalog(): Observable < any > {
    return this.authHttp.get('api/catalogs')
      .map(this.extractData)
      .catch(this.handleError);
  }

  destroyCatalog(id: string): Observable < any > {
    return this.authHttp.delete(`api/catalogs/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  // Application ------------------------------------------------------------------------------------------
  getApplication(): Observable < any > {
    return this.authHttp.get('api/applis')
      .map(this.extractData)
      .catch(this.handleError);
  }

  postApplication(name: string, info: string, RunCmd: string): Observable < any > {
    return this.authHttp.post('api/applis', {
        name,
        info,
        RunCmd
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  destroyApplication(id: string): Observable < any > {
    return this.authHttp.delete(`api/applis/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getMyVm(): Observable < any > {
    return this.authHttp.get('api/users/meVm')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getVmByUser(id: string): Observable < any > {
    return this.authHttp.get(`api/users/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getInfoVm(id: string): Observable < any > {
    return this.authHttp.get(`api/users/meVm/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  startVm(id: string): Observable < any > {
    return this.authHttp.get(`api/users/meVmStart/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  stopVm(id: string): Observable < any > {
    return this.authHttp.get(`api/users/meVmStop/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeVm(id: string): Observable < any > {
    return this.authHttp.delete(`api/users/meVmRemove/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDashboard(): Observable < any > {
    return this.authHttp.get(`api/admins/`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAdminUser(): Observable < any > {
    return this.authHttp.get(`api/users/`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getInfoVmSocket(Id: string): Observable < any > {
    const observable = new Observable(observer => {
      const token = localStorage.getItem('token');
      if (token) {
        this.socket = io({
          'query': 'token=' + token,
          'path': '/socket.io'
        });
        this.socket.emit('statsVm', Id);
      }
      this.socket.on('infoVm', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('disconnect');
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getInfoOs(): Observable < any > {
    const observable = new Observable(observer => {
      const token = localStorage.getItem('token');
      if (token) {
        this.socket = io({
          'query': 'token=' + token,
          'path': '/socket.io'
        });
        this.socket.emit('statsOs', 'ok');
      }
      this.socket.on('statsOSCPU', (data) => {
        observer.next({
          dataOSCPU: data
        });
      });
      this.socket.on('statsOSMemory', (data) => {
        observer.next({
          dataOSMemory: data
        });
      });
      return () => {
        console.log('disconnect');
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getVmSocket(): Observable < any > {
    const observable = new Observable(observer => {
      const token = localStorage.getItem('token');
      if (token) {
        this.socket = io({
          'query': 'token=' + token,
          'path': '/socket.io'
        });
      }
      this.socket.on('vm:update', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('disconnect');
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getAdminSocket(): Observable < any > {
    const observable = new Observable(observer => {
      const token = localStorage.getItem('token');
      if (token) {
        this.socket = io({
          'query': 'token=' + token,
          'path': '/socket.io'
        });
      }
      this.socket.on('admin:update', (data) => {
        observer.next(data);
      });
      return () => {
        console.log('disconnect');
        this.socket.disconnect();
      };
    });
    return observable;
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || body || {};
  }

  private handleError(error: Response | any) {
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
