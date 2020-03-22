/*
 * @LastEditors: hongyongbo
 * @LastEditTime: 2020-03-23 06:55:55
 * @Description:
 * @Notice:
 */

import { Component, OnInit, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { questionUrl } from '../../../api/index';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

interface IQuestion {
  questionDesc: string;
  id: string;
  score: number;
  options?: any;
  answer?: string;
  type?: 'single|multiple|qa|questionnaire';
}

interface IOptions {
  desc: string; id: string; correct: boolean;
}


@Component({
  selector: 'app-question-selection',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})

@Injectable()
export class QuestionSelectionComponent {
  @Input() questionType;
  constructor(private http: HttpClient, private notification: NzNotificationService) { }
  panels = [];

  visible = false;

  isEdit = false;

  tagList: Array<{ label: string; value: string }> = [];

  question: IQuestion = {
    id: '',

    questionDesc: '',
    score: 0,
    options: []
  };

  options: Array<IOptions> = [];

  questions: Array<IQuestion> = [];

  getIndex(key: number): string {
    return String.fromCharCode(key + 65);
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.reset();
    this.isEdit = false;
  }

  /**
   * 移除选项
   *
   * @param {string} id
   * @param {MouseEvent} e
   * @memberof QuestionSelectionComponent
   */
  removeField(id: string, e: MouseEvent): void {
    e.preventDefault();
    const idx = this.options.findIndex(item => item.id === id);
    this.options.splice(idx, 1);
    this.question.options = this.options;
  }
  /**
   * 添加选项
   *
   * @param {MouseEvent} [e]
   * @memberof QuestionSelectionComponent
   */
  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    this.options.push({
      desc: '选项描述',
      id: `option-${Date.now()}`,
      correct: false
    });
  }
  /**
   * 选择题标记正确答案
   *
   * @param {string} key
   * @memberof QuestionSelectionComponent
   */
  checkOption(key: string): void {
    const idx = this.options.findIndex(item => item.id === key);
    this.options[idx].correct = !this.options[idx].correct;
  }

  /**
   * 响应编辑操作
   *
   * @param {string} id
   * @memberof QuestionSelectionComponent
   */
  editQuestion(id: string): void {
    this.isEdit = true;
    const idx = this.questions.findIndex(item => item.id === id);
    const question = this.questions[idx];
    this.options = [].concat(question.options);
    this.question = { ...question };
    this.visible = true;
  }

  /**
   * 响应删除操作
   *
   * @param {string} id
   * @memberof QuestionSelectionComponent
   */
  deleteQuestion(id: string): void {
    const idx = this.questions.findIndex(item => item.id === id);
    const obj = this.questions.splice(idx, 1);
    this.panels = this.questions;
    this.deletetQuestion(obj[0]);
  }

  reset(): void {
    this.question = {
      id: '',
      questionDesc: '',
      score: 0,
      options: []
    };
    this.options = [];
  }


  /**
   *
   * 新建试题
   * @param {IQuestion} question
   * @returns
   * @memberof QuestionSelectionComponent
   */
  saveQuestion(question: IQuestion) {
    return this.http.post<IQuestion>(questionUrl, question, httpOptions)
      .subscribe(
        val => {
          console.log(val);
        },
        res => {
          if (res.status === 200) {
            this.createNotification('success', '操作成功！');
          } else {
            this.createNotification('error', res);
          }
        }

      );
  }

  /**
   * 编辑更新试题
   *
   * @param {IQuestion} question
   * @returns
   * @memberof QuestionSelectionComponent
   */
  putQuestion(question: IQuestion) {
    return this.http.put<IQuestion>(questionUrl, question, httpOptions)
      .subscribe(
        val => {
          console.log(val);
        },
        res => {
          if (res.status === 200) {
            this.createNotification('success', '操作成功！');
          } else {
            this.createNotification('error', res);
          }
        }
      );
  }


  /**
   * 删除试题
   *
   * @param {IQuestion} question
   * @returns
   * @memberof QuestionSelectionComponent
   */
  deletetQuestion(question: IQuestion) {
    return this.http.delete<IQuestion>(questionUrl, { params: { id: question.id } })
      .subscribe(
        val => {
          console.log(val);
        },
        res => {
          if (res.status === 200) {
            this.createNotification('success', '操作成功！');
          } else {
            this.createNotification('error', res);
          }
        }
      );
  }

  /**
   *
   * 按类型获取试题
   * @param {string} type
   * @returns {*}
   * @memberof QuestionSelectionComponent
   */
  getQuestions(type: string): any {
    const isQuestionArray = (props: any): props is Array<IQuestion> =>
      typeof (props as Array<IQuestion>) !== 'undefined';

    return this.http.get<[IQuestion]>(questionUrl, { params: { type } })
      .subscribe(
        val => {
          this.questions = val;
          this.panels = this.questions;
          // }
        },
        res => {
          if (res.status === 200) {
            this.createNotification('success', '操作成功！');
          } else {
            this.createNotification('error', res);
          }
        }
      );
  }

  /**
   * 提交编辑或新建结果
   *
   * @memberof QuestionSelectionComponent
   */
  submit(): void {
    if (!this.isEdit) {
      const question = {
        id: `question-${Date.now()}`,
        type: this.questionType,
        score: this.question.score,
        questionDesc: this.question.questionDesc,
        options: [].concat(this.options),
        answer: this.question.answer
      };
      this.questions.push(question);
      this.saveQuestion(question);

    } else {
      const idx = this.questions.findIndex(item => item.id === this.question.id);
      this.questions.splice(idx, 1, this.question);
      this.putQuestion(this.question);
    }
    this.panels = this.questions;
    this.close();
    this.reset();
  }


  createNotification(type: string, msg: string): void {
    this.notification.create(
      type,
      '操作状态',
      msg
    );
  }

  ngOnInit() {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.tagList = children;
    this.getQuestions(this.questionType);
  }
}
