
import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent {
  tabs = [
    {
      name: '单选题',
      disabled: false,
      type: 'single'
    },
    {
      name: '多选题',
      disabled: false,
      type: 'multiple'
    },
    {
      name: '问答题',
      disabled: false,
      type: 'qa'
    },
    {
      name: '问卷题',
      disabled: true,
      type: 'questionnaire'
    }

  ];
  tabIndex = 0;
  questionType = 'single';

  onTabClick(idx) {
    this.tabIndex = idx;
    if (idx === 0) {
      this.questionType = 'single';
    } else if (idx === 1) {
      this.questionType = 'multiple';
    } else if (idx === 2) {
      this.questionType = 'qa';
    } else {
      this.questionType = 'questionnaire';
    }
  }
}
