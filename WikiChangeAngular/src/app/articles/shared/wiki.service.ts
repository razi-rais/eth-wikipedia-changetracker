import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigService, Config } from '../../core';

@Injectable()
export class WikiService {
  config: Config;

  constructor(
    configService: ConfigService,
    private http: HttpClient
  ) {
    this.config = configService.config;
  }

  get(url: string): Observable<any> {
    if (!url || url.indexOf(this.config.baseUrls.wiki.article) !== 0) {
      return Observable.throw('Url needs to start with ' + this.config.baseUrls.wiki.article);
    }

    const title = url.substr(this.config.baseUrls.wiki.article.length).replace(/_/g, ' ');

    const params = new HttpParams()
      .set('action', 'query')
      .set('prop', 'pageprops')
      .set('ppprop', 'wikibase_item')
      .set('format', 'json')
      .set('titles', title);

    return this.http.jsonp<any>(`${this.config.baseUrls.wiki.api}?${params.toString()}`, 'callback')
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
