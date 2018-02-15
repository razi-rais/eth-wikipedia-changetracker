import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material.module';

import './core/rxjs-extensions';
import { AppComponent } from './app.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';

import { ArticleComponent } from './articles/article/article.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
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
    BrowserAnimationsModule,
    FormsModule,

    CoreModule,

    AppMaterialModule,

    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleListComponent,
    NavigationComponent,
    WatchComponent
  ],
  providers: [ArticleService, ArticleWeb3Service, WikiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
