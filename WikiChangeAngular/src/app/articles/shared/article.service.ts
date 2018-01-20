import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../../core';
import { Article } from './article.model';
import { ArticlePost } from './article-post.model';

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) { }

  get(userId: string): Observable<Article[]> {
    return this.http.get<any>(CONFIG.baseUrls.articles,
      {
        params: new HttpParams()
          .set('userID', userId)
      })
      .map(response => {
        const data = JSON.parse(response.message);
        return data.map(el => {
          const article = new Article();
          article.id = el.id;
          article.title = el.title;
          article.url = el.url;
          return article;
        });
      })
      .catch(error => this.handleError(error, 'Error getting articles!'));
  }

  post(articlePost: ArticlePost) {
    return this.http.post<ArticlePost>(CONFIG.baseUrls.articles, articlePost)
      .catch(error => this.handleError(error, 'Error saving article watch!'));
  }

  delete(userId: string, articleId: string) {
    return this.http.delete<any>(CONFIG.baseUrls.articles,
      {
        params: new HttpParams()
          .set('userID', userId)
          .set('articleID', articleId)
      })
      .catch(error => this.handleError(error, 'Error deleting article watch!'));
  }

  private handleError<T>(error: HttpErrorResponse, msg: string) {
    console.error(error);
    return Observable.throw(msg);
  }

}
