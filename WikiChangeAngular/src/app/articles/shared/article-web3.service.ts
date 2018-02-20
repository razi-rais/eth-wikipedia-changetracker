import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as _Web3 from 'web3';
import * as moment from 'moment';

import { ConfigService, Config } from '../../core';
import { Article } from './article.model';

const Web3 = _Web3 as any; // TODO: workaround for "TS2351: Cannot use 'new' ..." TypeScript error;

@Injectable()
export class ArticleWeb3Service {
  config: Config;

  constructor(configService: ConfigService) {
    this.config = configService.config;
  }

  startPolling(): Observable<Article[]> {

    return Observable.create((observer: Observer<Article[]>) => {
      let timeoutId = null;
      let contractInstance = null;
      try {
        const web3 = new Web3(new Web3.providers.HttpProvider(this.config.baseUrls.web3));
        contractInstance = new web3.eth.Contract(this.config.web3.jsonContract, this.config.web3.contractId);
      } catch (error) {
        console.error(error);
        return observer.error('Error getting articles');
      }

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
              article.title = this.base64Decode(ev.returnValues['title']);
              article.url = this.base64Decode(ev.returnValues['url']);
              article.change_type = this.base64Decode(ev.returnValues['change_type']);
              article.comment = this.base64Decode(ev.returnValues['comment']);
              article.revision_new = ev.returnValues['revision_new'];
              article.revision_old = ev.returnValues['revision_old'];
              article.timestamp = moment.unix(parseInt(ev.returnValues['timestamp'], 10));
              article.user = this.base64Decode(ev.returnValues['user']);

              article.transactionHash = ev.transactionHash;
              return article;
            }));
            timeoutId = setTimeout(getArticles, this.config.web3.pollInteval);
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

  base64Decode(val): string {
    try {
      return atob(val);
    } catch (e) {
      console.log(e);
      return val;
    }
  }

}
