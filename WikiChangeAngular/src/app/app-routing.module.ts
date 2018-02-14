import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleComponent } from './articles/article/article.component';
import { WatchComponent } from './watch/watch.component';
import { ConfigService } from './core';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
    {
        path: '',
        resolve: { config: ConfigService },
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'article/:id', component: ArticleComponent },
            { path: 'watch', component: WatchComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }
