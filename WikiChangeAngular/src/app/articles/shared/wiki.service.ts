import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../../core';

@Injectable()
export class WikiService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    if (!url || url.indexOf(CONFIG.baseUrls.wiki) !== 0) {
      return Observable.throw('Url needs to start with ' + CONFIG.baseUrls.wiki);
    }

    const title = url.substr(CONFIG.baseUrls.wiki.length).replace(/_/g, ' ');

    const params = new HttpParams()
    .set('action', 'query')
    .set('prop', 'pageprops')
    .set('ppprop', 'wikibase_item')
    .set('format', 'json')
    .set('titles', title);

    return this.http.jsonp<any>(`${CONFIG.baseUrls.wikiApi}?${params.toString()}`, 'callback')
      .map(response => {
        const id = Object.keys(response.query.pages)[0];
        return response.query.pages[id];
      })
      .catch(error => this.handleError(error, 'Error getting wiki data!'));
  }

  private handleError<T>(error: HttpErrorResponse, msg: string) {
    console.error(error);
    return Observable.throw(msg);
  }

}
