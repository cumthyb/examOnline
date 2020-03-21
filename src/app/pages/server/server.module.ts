import { NgModule } from '@angular/core';

import { ServerRoutingModule } from './server-routing.module';

import { ServerComponent } from './server.component';


@NgModule({
  imports: [ServerRoutingModule],
  declarations: [ServerComponent],
  exports: [ServerComponent]
})
export class ServerModule { }
