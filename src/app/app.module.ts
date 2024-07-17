import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 導入 BrowserAnimationsModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // 確保這裡導入了 ReactiveFormsModule
import { routes } from './app.routes';

//shared
import { SharedModuleModule } from './shared-module/shared.module';

//component
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { Page4Component } from './page4/page4.component';
import { Page5Component } from './page5/page5.component';
import { Page6Component } from './page6/page6.component';

@NgModule({
  declarations: [
    Page1Component,
    Page2Component,
    Page3Component,
    Page4Component,
    Page5Component,
    Page6Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModuleModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes), // 使用 RouterModule.forRoot(routes) 来配置路由
  ],
  exports: [RouterModule], // 如果需要在模块外使用 RouterLink 等指令，导出 RouterModule
  providers: [],
  bootstrap: []
})
export class AppModule { }
