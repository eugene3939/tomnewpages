import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactformComponent } from '../contactform/contactform.component';
import { SharedModuleModule } from '../shared-module/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';  // 確保這裡導入了 ReactiveFormsModule

@NgModule({
  declarations: [ContactformComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule  // 在這裡導入 ReactiveFormsModule
  ]
})
export class TestModule { }
