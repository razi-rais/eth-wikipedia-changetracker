import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from '..';

class ConfigEdit { name: string; key: string; type: string; isValid: boolean; }

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  config: Config;
  configsToEdit: ConfigEdit[];

  constructor(configService: ConfigService) {
    this.config = configService.config;
  }

  ngOnInit() {
    this.configsToEdit = [
      {
        name: 'Article API Endpoint',
        key: 'baseUrls.api.articles',
        type: 'text',
        isValid: true
      },
      {
        name: 'Web3 API URL',
        key: 'baseUrls.web3',
        type: 'text',
        isValid: true
      },
      {
        name: 'Poll Interval (ms)',
        key: 'web3.pollInteval',
        type: 'number',
        isValid: true
      },
      {
        name: 'Contract Id',
        key: 'web3.contractId',
        type: 'text',
        isValid: true
      }
    ];
  }

  getVal(cfg: ConfigEdit): any {
    if (!cfg) {
      return '';
    }
    const keys = cfg.key.split('.');
    return this.getLastObj(keys)[keys[keys.length - 1]];
  }


  setVal(cfg: ConfigEdit, val: any) {
    if (!cfg) {
      return;
    }

    switch (cfg.type) {
      case 'text':
        cfg.isValid = val && val.length;
        break;
      case 'number':
        val = parseInt(val, 10);
        cfg.isValid = !isNaN(val);
        break;
    }

    if (!cfg.isValid) {
      return;
    }

    const keys = cfg.key.split('.');
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
