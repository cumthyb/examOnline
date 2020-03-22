import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'teacher', loadChildren: () => import('./pages/teacher/teacher.module').then(m => m.TeacherModule) },
  { path: 'student', loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule) },
  { path: 'server', loadChildren: () => import('./pages/server/server.module').then(m => m.ServerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
