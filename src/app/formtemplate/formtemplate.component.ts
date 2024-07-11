import { SharedModuleModule } from './../shared-module/shared.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-formtemplate',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './formtemplate.component.html',
  styleUrl: './formtemplate.component.scss'
})
export class FormtemplateComponent {

  // 1. 終端機先安裝: npm install tailwindcss@latest
  // 2. tailwind css 建置教學 (先做這個才能讀取css樣式)
  // https://tailwindcss.com/docs/installation



}
