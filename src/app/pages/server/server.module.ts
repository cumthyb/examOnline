import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ServerRoutingModule } from './server-routing.module';
import { ServerComponent } from './server.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ServerRoutingModule,
    NzInputModule,
    NzModalModule,
    NzTableModule,
    NzDrawerModule,
    NzInputNumberModule
  ],
  declarations: [ServerComponent],
  exports: [ServerComponent]
})
export class ServerModule { }
