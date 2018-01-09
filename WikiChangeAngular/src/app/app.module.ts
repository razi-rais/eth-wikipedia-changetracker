import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import './core/rxjs-extensions';
import { AppComponent } from './app.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';

import { ArticleComponent } from './articles/article/article.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WatchComponent } from './watch/watch.component';

import { ArticleService } from './articles/shared/article.service';
import { ArticleWeb3Service } from './articles/shared/article-web3.service';
import { WikiService } from './articles/shared/wiki.service';


@NgModule({
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    FormsModule,

    CoreModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleListComponent,
    DashboardComponent,
    NavigationComponent,
    WatchComponent
  ],
  providers: [ArticleService, ArticleWeb3Service, WikiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
