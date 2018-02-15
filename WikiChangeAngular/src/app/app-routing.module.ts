import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticleComponent } from './articles/article/article.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ConfigService } from './core';
import { ConfigComponent } from './core/config/config.component';
import { WatchComponent } from './watch/watch.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    {
        path: '',
        resolve: { config: ConfigService },
        children: [
            { path: 'dashboard', component: ArticleListComponent },
            { path: 'article/:id', component: ArticleComponent },
            { path: 'watch', component: WatchComponent },
            { path: 'config', component: ConfigComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
