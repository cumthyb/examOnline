import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { paperQAUrl, paperScoreQAUrl } from '../../api/index';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { formatTime } from '../../utils/index';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

interface IQAPaper {
  id?: string;
  stName?: string;
  commitTime?: number;
  questions?: [any];
}


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.less']
})
export class ServerComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private notification: NzNotificationService,
    public router: Router
  ) { }

  listOfData: [IQAPaper];

  paper: IQAPaper = {
    questions: [{}]
  };

  visible = false; // 抽屉显示隐藏

  /**
   *
   * 获取所有的问答题答卷
   * @param {string} [type='qa']
   * @returns
   * @memberof ServerComponent
   */
  getPapers(type = 'qa') {
    return this.http.get<[IQAPaper]>(paperQAUrl, { params: { type } })
      .subscribe(
        val => {
          this.listOfData = val;
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
   * 获取制定id的答卷
   * @param {string} id
   * @returns
   * @memberof ServerComponent
   */
  getQAPaper(id: string) {
    return this.http.get<IQAPaper>(paperQAUrl, { params: { id } })
      .subscribe(
        val => {
          this.paper = val[0];
          console.log(val);
        },
        res => {
          console.log(res);
        }
      );
  }

  /**
   * 格式化显示时间
   * 'Y-m-d H:i:s'
   * @param {number} timeStamp
   * @returns {string}
   * @memberof ServerComponent
   */
  getFormatTime(timeStamp: number): string {
    return timeStamp ? formatTime(timeStamp, 'Y-m-d H:i:s') : '';
  }

  /**
   * 提交评判结果，并刷新答卷列表
   *
   * @param {*} data
   * @returns
   * @memberof ServerComponent
   */
  getScore(data) {
    return this.http.post<number>(paperScoreQAUrl, data, httpOptions)
      .subscribe(
        val => {
          console.log(val);
          this.getPapers();
          this.close();
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
   * 打开右侧抽屉
   *
   * @param {*} data
   * @memberof ServerComponent
   */
  open(data) {
    console.log(data);
    this.visible = true;
    this.paper = data;
  }
  /**
   * 关闭右侧抽屉
   *
   * @memberof ServerComponent
   */
  close() {
    this.visible = false;
  }
  /**
   * 提交评分
   *
   * @memberof ServerComponent
   */
  submit() {
    this.visible = false;
    const data = this.paper;
    this.getScore(data);
  }

  /**
   * 右上角消息
   *
   * @param {string} type
   * @param {string} msg
   * @memberof ServerComponent
   */
  createNotification(type: string, msg: string): void {
    this.notification.create(
      type,
      '操作状态',
      msg
    );
  }

  ngOnInit() {
    this.getPapers();
  }

}
