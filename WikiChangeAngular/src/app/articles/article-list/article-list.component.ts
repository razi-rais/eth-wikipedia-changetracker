import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as _ from 'underscore';

import { Article } from '../shared/article.model';
import { ArticleWeb3Service } from '../shared/article-web3.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  articles: Article[] = [];

  constructor(private articleWeb3Service: ArticleWeb3Service) { }

  ngOnInit() {
    this.getArticles();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getArticles() {
    this.articles = [];

    this.sub = this.articleWeb3Service.startPolling()
      .subscribe(articles => {
        this.articles = _.chain(articles)
          .groupBy('id')
          .map(group => _.max(group, article => article.timestamp))
          .value();
      }, error => { });
  }

  isTimestampBetween(article: Article, from: number, to?: number): boolean {
    const diff = moment().diff(article.timestamp, 'h');
    return from < diff && (to === undefined || diff <= to);
  }

}
