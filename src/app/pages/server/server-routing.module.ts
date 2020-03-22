import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerComponent } from './server.component';
import { QAScoreComponent } from '../qaScore/index.component';

const routes: Routes = [
  { path: '', component: ServerComponent },
  { path: 'qaScore', component: QAScoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServerRoutingModule { }
