import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StudentRoutingModule,
    NzRadioModule,
    NzCheckboxModule,
    NzInputModule,
    NzResultModule,
    NzModalModule
  ],
  declarations: [StudentComponent],
  exports: [StudentComponent]
})
export class StudentModule { }
