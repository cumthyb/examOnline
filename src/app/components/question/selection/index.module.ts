/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-22 07:32:55
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRateModule } from 'ng-zorro-antd/rate';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzCollapseModule,
    NzDrawerModule,
    NzInputModule,
    NzSelectModule,
    NzRateModule
  ],
  declarations: [QuestionSelectionComponent],
  exports: [QuestionSelectionComponent]
})
export class QuestionSelectionModule { }
