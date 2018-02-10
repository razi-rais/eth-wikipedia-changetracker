import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatSort } from '@angular/material';
import * as moment from 'moment';
import * as _ from 'underscore';

import { CONFIG } from '../../core';
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
  displayedColumns = ['timestamp', 'user', 'revision_old', 'revision_new', 'comment'];
  dataSource = new MatTableDataSource<Article>(this.articles);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleWeb3Service: ArticleWeb3Service
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = 'timestamp';
    this.dataSource.sort.direction = 'desc';

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
          .value();
        this.dataSource.data = this.articles;
      }, error => { }));
  }

  getUserUrl(article: Article) {
    if (!article || !article.user) {
      return '';
    }
    const isIP = article.user.match(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/);
    return isIP
      ? this.getUrl(CONFIG.baseUrls.wikiContributions, article)
      : this.getUrl(CONFIG.baseUrls.wikiUser, article);
  }

  getRevisionOldUrl(article: Article) {
    if (!article) {
      return '';
    }
    return this.getUrl(CONFIG.baseUrls.wikiRevisionOld, article);
  }

  getRevisionNewUrl(article: Article) {
    if (!article) {
      return '';
    }
    return this.getUrl(CONFIG.baseUrls.wikiRevisionNew, article);
  }

  getUrl(url: string, obj: any) {
    return url.replace(/\{(\w+)\}/g, (match, group) => obj.hasOwnProperty(group) ? obj[group] : '');
  }

}
