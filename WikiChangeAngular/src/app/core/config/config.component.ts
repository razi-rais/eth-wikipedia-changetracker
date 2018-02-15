import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from '..';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  config: Config;
  valsToEdit: any[];

  constructor(configService: ConfigService) {
    this.config = configService.config;
  }

  ngOnInit() {
    this.valsToEdit = [
      {
        name: 'Article API URL',
        key: 'baseUrls.api.articles'
      },
      {
        name: 'Web3 API URL',
        key: 'baseUrls.web3'
      },
      {
        name: 'Poll Interval (sec)',
        key: 'web3.pollInteval'
      },
      {
        name: 'Contract Id',
        key: 'web3.contractId'
      }
    ];
  }

  getVal(key: string): any {
    if (!key) {
      return '';
    }
    const keys = key.split('.');
    return this.getLastObj(keys)[keys[keys.length - 1]];
  }


  setVal(key: string, val: any) {
    if (!key) {
      return;
    }
    const keys = key.split('.');
    this.getLastObj(keys)[keys[keys.length - 1]] = val;
  }

  getLastObj(keys: string[]) {
    let curr = this.config;
    for (let i = 0; i < keys.length - 1; i++) {
      curr = curr[keys[i]];
    }
    return curr;
  }
}
