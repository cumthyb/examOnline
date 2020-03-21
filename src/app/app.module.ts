// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
// import { IconsProviderModule } from './icons-provider.module';
// import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { registerLocaleData } from '@angular/common';
// import zh from '@angular/common/locales/zh';

// registerLocaleData(zh);

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     IconsProviderModule,
//     NgZorroAntdModule,
//     FormsModule,
//     HttpClientModule,
//     BrowserAnimationsModule
//   ],
//   providers: [{ provide: NZ_I18N, useValue: zh_CN }],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppComponent } from './app.component';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    AppRoutingModule,
    // IconsProviderModule,
  ],
  bootstrap: [ AppComponent ],
  /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
  providers   : [
    { provide: NZ_I18N, useValue: zh_CN }
  ]
})
export class AppModule { }
