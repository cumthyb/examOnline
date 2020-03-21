/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-21 17:15:58
 * @Description:
 * @Notice:
 */


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { QuestionSelectionComponent } from './index.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzCollapseModule,
    NzDrawerModule,
    NzInputModule
  ],
  declarations: [QuestionSelectionComponent],
  exports: [QuestionSelectionComponent]
})
export class QuestionSelectionModule { }
