import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';
import * as _ from 'underscore';

import { Article } from '../articles/shared/article.model';
import { ArticlePost } from '../articles/shared/article-post.model';
import { ArticleService } from '../articles/shared/article.service';
import { WikiService } from '../articles/shared/wiki.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit, OnDestroy {
  private wikiCalls = [];
  private sub = new Subscription();
  userId: string;
  watching: Article[];
  newArticles: Article[];

  constructor(
    private articleService: ArticleService,
    private wikiService: WikiService,
  ) { }

  ngOnInit() {
    this.userId = '10';
    this.reset();
    this.getWatching();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  reset() {
    this.newArticles = [];
    this.addArticle();
  }

  getWatching() {
    this.watching = [];
    this.sub.add(this.articleService.get(this.userId)
      .subscribe(watching => this.watching = watching));
  }

  delete(article: Article) {
    this.articleService.delete(this.userId, article.id)
      .subscribe(watching => this.getWatching());
  }

  addArticle() {
    this.newArticles.push(new Article());
  }

  removeArticle() {
    if (this.newArticles.length > 1) {
      this.newArticles.pop();
    }
  }

  onSubmit() {
    const post = () => {
      if (!this.userId) { console.log('User Id required'); return; }

      let error = false;
      const articles = _.filter(this.newArticles, article => {
        const notEmpty = article.url && article.url.length > 0;
        const invalid = notEmpty && (!article.id || !article.title);
        if (invalid) {
          console.log(`Invalid article url: ${article.url}`);
          error = true;
        }
        return notEmpty;
      });

      if (!error) {
        this.articleService.post(new ArticlePost(this.userId, articles))
          .subscribe(res => { this.reset(); this.getWatching(); }, (err) => console.log(err));
      }
    };

    // wait for all wikiTitle requests to complete before saving.
    if (this.wikiCalls.length > 0) {
      Observable.forkJoin(this.wikiCalls).subscribe(results => {
        post();
      });
    } else {
      post();
    }
  }

  getTitleAndId(article: Article) {
    article.id = null;
    article.title = null;
    if (!article.url || article.url.length === 0) {
      return;
    }

    // synchronization observable.
    let getComplete: Observer<boolean>;
    const obs = Observable.create((o: Observer<boolean>) => getComplete = o);
    this.wikiCalls.push(obs);

    this.sub.add(this.wikiService.get(article.url)
      .subscribe(wikiArticle => {
        article.id = wikiArticle.pageid.toString();
        article.title = wikiArticle.title;
        this.removeWikiCall(obs, getComplete);
      }, (error) => {
        this.removeWikiCall(obs, getComplete, error);
      }));
  }

  removeWikiCall(obs: Observable<boolean>, getComplete: Observer<boolean>, error?: any) {
    const indx = this.wikiCalls.indexOf(obs);
    if (indx >= 0) {
      this.wikiCalls.splice(indx, 1);
    }

    if (!getComplete) {
      return;
    }

    if (error) {
      getComplete.error(error);
    } else {
      getComplete.next(true);
      getComplete.complete();
    }
  }
}
