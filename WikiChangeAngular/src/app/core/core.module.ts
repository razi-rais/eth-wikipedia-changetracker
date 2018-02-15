import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConfigService } from './config.service';
import { ConfigComponent } from './config/config.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ConfigComponent, ContainerComponent],
  providers: [ConfigService],
  exports: [ConfigComponent, ContainerComponent]
})
export class CoreModule { }
