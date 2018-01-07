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

  getTimestampAge(article: Article) {
    const num = parseInt(article.timestamp, 10);
    return moment().diff(moment.unix(num), 'h');
  }

}
