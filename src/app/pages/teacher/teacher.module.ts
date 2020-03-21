import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { QuestionSelectionModule } from '../../components/question/selection/index.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TeacherRoutingModule,
    NzTabsModule,
    QuestionSelectionModule,
  ],
  declarations: [TeacherComponent],
  exports: [TeacherComponent]
})
export class TeacherModule { }
