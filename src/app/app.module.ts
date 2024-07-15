import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModuleModule } from './shared-module/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // 導入 BrowserAnimationsModule
import { ReactiveFormsModule } from '@angular/forms';  // 確保這裡導入了 ReactiveFormsModule
import { routes } from './app.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes), // 使用 RouterModule.forRoot(routes) 来配置路由
  ],
  exports: [RouterModule], // 如果需要在模块外使用 RouterLink 等指令，导出 RouterModule
  providers: [],
  bootstrap: []
})
export class AppModule { }
