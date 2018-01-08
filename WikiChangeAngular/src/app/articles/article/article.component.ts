import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import moment = require('moment');

import { Article } from '../shared/article.model';
import { ArticleWeb3Service } from '../shared/article-web3.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  id: string;
  private subscription = new Subscription();
  article: Article = new Article();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleWeb3Service: ArticleWeb3Service
  ) { }

  ngOnInit() {
    this.subscription.add(this.route.params
      .map(params => this.id = params['id'])
      .subscribe(id => this.getArticle()));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getArticle() {
    this.article = new Article();

    this.subscription.add(this.articleWeb3Service.startPolling()
      .subscribe(articles => { this.article = articles.find(article => article.id === this.id); }, error => { }));
  }

}
