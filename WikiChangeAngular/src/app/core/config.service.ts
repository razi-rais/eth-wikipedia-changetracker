import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '.';

@Injectable()
export class ConfigService implements Resolve<Config> {

  public config: Config;

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Config> {
    return this.http.get<Config>('/config.json')
      .map(response => {
        this.config = response;
        return response;
      })
      .catch(error => this.handleError(error, 'Error getting wiki data!'));
  }

  private handleError<T>(error: HttpErrorResponse, msg: string) {
    console.error(error);
    return Observable.throw(msg);
  }
}
