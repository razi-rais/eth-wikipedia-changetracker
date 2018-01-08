import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import moment = require('moment');

import { Article } from '../shared/article.model';
import { ArticleWeb3Service } from '../shared/article-web3.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
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

  isTimestampBetween(article: Article, from: number, to?: number): boolean {
    const diff = moment().diff(article.timestamp, 'h');
    return from < diff && (to === undefined || diff <= to);
  }

}
