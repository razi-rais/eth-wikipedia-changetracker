import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import moment = require('moment');

import { Article } from '../shared/article.model';
import { ArticleWeb3Service } from '../shared/article-web3.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;
  articles: Article[] = [];

  constructor(private articleWeb3Service: ArticleWeb3Service) { }

  ngOnInit() {
    this.getArticles();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getArticles() {
    this.articles = [];

    this.subscription = this.articleWeb3Service.startPolling()
      .subscribe(articles => { this.articles = articles; }, error => { });
  }

  isTimestampBetween(article: Article, from: number, to?: number) {
    const num = parseInt(article.timestamp, 10);
    const diff = moment().diff(moment.unix(num), 'h');

    return from < diff && (to === undefined || diff <= to);
  }

}
