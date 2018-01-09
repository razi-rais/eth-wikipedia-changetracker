import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';

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
  model: ArticlePost;

  constructor(
    private articleService: ArticleService,
    private wikiService: WikiService,
  ) { }

  ngOnInit() {
    this.reset();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  reset() {
    this.model = new ArticlePost('', [new Article()]);
  }

  onSubmit() {
    const post = () => {
      if (!this.model.UserID) { console.log('User Id required'); return; }
      let error = false;
      for (let i = 0; i < this.model.Articles.length; i++) {
        if (!this.model.Articles[i].id || !this.model.Articles[i].title) {
          console.log(`Invalid article url: ${this.model.Articles[i].url}`);
          error = true;
        }
      }

      if (!error) {
        this.articleService.post(this.model)
          .subscribe(res => this.reset(), (err) => console.log(err));
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
    let observer = null;
    const obs = Observable.create((o: Observer<boolean>) => observer = o);
    this.wikiCalls.push(obs);

    const subscription = this.wikiService.get(article.url)
      .subscribe(wikiArticle => {
        article.id = wikiArticle.pageid.toString();
        article.title = wikiArticle.title;
        this.removeWikiCall(obs, subscription);
        this.complete(observer);
      }, (error) => {
        this.removeWikiCall(obs, subscription);
        this.complete(observer, error);
      });

    this.sub.add(subscription);
  }

  removeWikiCall(obs: Observable<boolean>, subscription: Subscription) {
    const indx = this.wikiCalls.indexOf(obs);
    if (indx >= 0) {
      this.wikiCalls.splice(indx, 1);
    }
    subscription.unsubscribe();
  }

  complete(observer: Observer<boolean>, error?: any) {
    if (!observer) {
      return;
    }

    if (error) {
      observer.error(error);
    } else {
      observer.next(true);
      observer.complete();
    }
  }
}
