import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as _Web3 from 'web3';
import * as moment from 'moment';

import { CONFIG } from '../../core';
import { Article } from './article.model';

const Web3 = _Web3 as any; // TODO: workaround for "TS2351: Cannot use 'new' ..." TypeScript error;

@Injectable()
export class ArticleWeb3Service {

  constructor() { }

  startPolling(): Observable<Article[]> {
    const web3 = new Web3(new Web3.providers.HttpProvider(CONFIG.baseUrls.web3));

    const contractInstance = new web3.eth.Contract(CONFIG.web3.jsonContract, CONFIG.web3.contractId);

    return Observable.create((observer: Observer<Article[]>) => {
      let timeoutId = null;

      const getArticles = () => {
        timeoutId = null;
        contractInstance.getPastEvents('articleUpdateEvent',
          {
            fromBlock: 0,
            toBlock: 'latest'
          })
          .then((events) => {
            if (observer.closed) { return; }
            observer.next(events.map(ev => {
              const article = new Article();
              article.id = ev.returnValues['id'];
              article.title = atob(ev.returnValues['title']);
              article.url = atob(ev.returnValues['url']);
              article.change_type = atob(ev.returnValues['change_type']);
              article.comment = atob(ev.returnValues['comment']);
              article.revision_new = ev.returnValues['revision_new'];
              article.revision_old = ev.returnValues['revision_old'];
              article.timestamp = moment.unix(parseInt(ev.returnValues['timestamp'], 10));
              article.user = atob(ev.returnValues['user']);
              return article;
            }
            ));
            timeoutId = setTimeout(getArticles, CONFIG.web3.pollInteval);
          })
          .catch((error) => {
            console.error(error);
            return observer.error('Error getting articles');
          });
      };

      getArticles();

      // stop polling on unsubscribe
      return () => {
        if (timeoutId != null) {
          clearTimeout(timeoutId);
        }
      };
    });

  }

}
