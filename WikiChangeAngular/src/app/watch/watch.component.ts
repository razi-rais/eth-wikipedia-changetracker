import { Component, OnInit } from '@angular/core';

import { Article } from '../articles/shared/article.model';
import { ArticlePost } from '../articles/shared/article-post.model';
import { ArticleService } from '../articles/shared/article.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  model: ArticlePost;

  getArticle(i: number): Article {
    if (!this.model.Articles[i]) {
      this.model.Articles[i] = new Article();
    }
    return this.model.Articles[i];
  }

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.model = new ArticlePost('', []);
  }
  onSubmit() {
    this.articleService.post(this.model)
      .subscribe(res => {
        console.log(res);
        this.reset();
      }, (err) => console.log(err));
  }

}
