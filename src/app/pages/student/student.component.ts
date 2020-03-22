import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { paperUrl, paperQAUrl } from '../../api/index';

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
  type?: 'single|multiple|qa';
}

interface IPaper {
  stName?: string;
  score?: number;
  totalScore?: number;
  questions: [any];
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.less']
})

@Injectable()
export class StudentComponent implements OnInit {

  constructor(private http: HttpClient, private notification: NzNotificationService) { }

  paper: IPaper = {
    questions: [{}]
  };
  myScore = 0;
  answers = [];
  showResult = false;

  style = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  radioValue = 'A';
  questionType = '!qa';
  isVisibleTop = false;
  stName = '';

  getIndex(key: number): string {
    return String.fromCharCode(key + 65);
  }

  getIndexByStr(key: string): number {
    return key.charCodeAt(0) - 65;
  }

  getPaper(type = 'selection') {
    this.questionType = type;
    return this.http.get<[any]>(paperUrl, {params: {type}})
      .subscribe(
        val => {
          this.paper = {
            questions: val
          };
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

  getScore(answers: Array<{ id: string, answer: string }>) {
    return this.http.post<number>(paperUrl, answers, httpOptions)
      .subscribe(
        val => {
          this.myScore = val;
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

  postQAPaper() {
    return this.http.post(paperQAUrl,  this.paper, httpOptions)
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

  handleChangeAnswer(index, e) {
    const idx = this.getIndexByStr(e);
    this.answers[index] = idx;
  }

  handleChangeAnswerMultiple(index, e) {
    const idx = e.map(item => this.getIndexByStr(item));
    this.answers[index] = idx.sort().join();
  }

  handleOkTop() {
    this.isVisibleTop = false;
    this.paper.stName = this.stName;
    this.postQAPaper();
    this.stName = '';
  }

  submit() {
    const answers = this.paper.questions.map((item, index) => {
      if (item.type !== 'qa') {
        item.answer = this.answers[index];
      }
      return {
        id: item.id as string,
        answer: (item.answer as string) || '-1'
      };
    });

    if (this.questionType === 'qa') {
      this.isVisibleTop = true;
    } else {
      this.showResult = true;
      this.getScore(answers);
    }

  }

  retry() {
    this.answers = [];
    this.showResult = false;
  }

  ngOnInit() {
    this.getPaper();
  }

  createNotification(type: string, msg: string): void {
    this.notification.create(
      type,
      '操作状态',
      msg
    );
  }
}
