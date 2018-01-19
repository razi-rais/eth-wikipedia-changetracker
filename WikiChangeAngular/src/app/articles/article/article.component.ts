import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import * as _ from 'underscore';

import { Article } from '../shared/article.model';
import { ArticleWeb3Service } from '../shared/article-web3.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  id: string;
  private sub = new Subscription();
  articles: Article[] = [new Article()];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleWeb3Service: ArticleWeb3Service
  ) { }

  ngOnInit() {
    this.sub.add(this.route.params
      .map(params => this.id = params['id'])
      .subscribe(id => this.getArticle()));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getArticle() {
    this.articles = [new Article()];

    this.sub.add(this.articleWeb3Service.startPolling()
      .subscribe(articles => {
          this.articles = _.chain(articles)
          .filter(article => article.id === this.id)
          .sortBy('timestamp')
          .reverse()
          .value();
      }, error => { }));
  }

}
