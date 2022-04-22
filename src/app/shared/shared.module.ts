import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { UserCardComponent } from './components/user-card/user-card.component';


@NgModule({
  declarations: [
    UserCardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    UserCardComponent
  ]
})
export class SharedModule { }
