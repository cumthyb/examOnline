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

  questionType = '!qa';
  isVisibleTop = false;
  stName = '';

  /**
   * 索引序号转大写字母序号
   * 0=>A
   * @param {number} key
   * @returns {string}
   * @memberof StudentComponent
   */
  getIndex(key: number): string {
    return String.fromCharCode(key + 65);
  }

  /**
   * 字母序号转索引序号
   * A=>0
   * @param {string} key
   * @returns {number}
   * @memberof StudentComponent
   */
  getIndexByStr(key: string): number {
    return key.charCodeAt(0) - 65;
  }

  /**
   * 从题库中抽入题目组成试卷，默认为选择题类型
   *
   * @param {string} [type='selection']
   * @returns
   * @memberof StudentComponent
   */
  getPaper(type = 'selection') {
    this.questionType = type;
    return this.http.get<[any]>(paperUrl, { params: { type } })
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

  /**
   * 提交选择题答卷，并获取评分
   *
   * @param {Array<{ id: string, answer: string }>} answers
   * @returns
   * @memberof StudentComponent
   */
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

  /**
   * 提交问答题答卷
   *
   * @returns
   * @memberof StudentComponent
   */
  postQAPaper() {
    return this.http.post(paperQAUrl, this.paper, httpOptions)
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
   * 提交答卷
   *
   * @memberof StudentComponent
   */
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

  /**
 * 单选题勾选变化
 *
 * @param {*} index
 * @param {*} e
 * @memberof StudentComponent
 */
  handleChangeAnswer(index, e) {
    const idx = this.getIndexByStr(e);
    this.answers[index] = idx;
  }

  /**
   *
   * 多选题勾选变化
   * @param {*} index
   * @param {*} e
   * @memberof StudentComponent
   */
  handleChangeAnswerMultiple(index, e) {
    const idx = e.map(item => this.getIndexByStr(item));
    this.answers[index] = idx.sort().join();
  }

  /**
   * 姓名弹窗
   *
   * @memberof StudentComponent
   */
  handleOkTop() {
    this.isVisibleTop = false;
    this.paper.stName = this.stName;
    this.postQAPaper();
    this.stName = '';
  }

  /**
   *
   * 重置
   * @memberof StudentComponent
   */
  reset() {
    this.answers = [];
    this.showResult = false;
  }

  createNotification(type: string, msg: string): void {
    this.notification.create(
      type,
      '操作状态',
      msg
    );
  }

  ngOnInit() {
    this.getPaper();
  }

}
