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
  visible = false;


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

  open(data) {
    console.log(data);
    this.visible = true;
    this.paper = data;
  }

  close() {
    this.visible = false;

  }


  getFormatTime(timeStamp: number): string {
    return timeStamp ? formatTime(timeStamp, 'Y-m-d H:i:s') : '';
  }

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

  submit() {
    this.visible = false;
    const data = this.paper;
    this.getScore(data);
  }

  ngOnInit() {
    this.getPapers();
  }
  createNotification(type: string, msg: string): void {
    this.notification.create(
      type,
      '操作状态',
      msg
    );
  }
}
