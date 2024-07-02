import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared.module';

import { FormArray, FormBuilder } from '@angular/forms';
//service
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
//object
import { MyProperty } from '../object/MyProperty';

import propertyData  from '../../assets/lproperty.json';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [SharedModuleModule],
  providers:[
    MessageService,
    ConfirmationService,
    DialogService,
    HttpClient,
  ],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component implements OnInit{
  propertyForms: FormArray;               // 用fFormArray管理table顯示內容
  localData: MyProperty[] = []; // 本地: jsonyData ; 遠端: propertyData

  jsonyData: MyProperty[] = propertyData;

  cols = [  // 欄位名稱 (能否編輯)
    { header: '單位編號', field: 'UnitNo', editable: true, required: true },
    { header: '單位名稱', field: 'UnitName', editable: true, required: true },
    { header: '統一編號', field: 'UnitCode', editable: true, required: true },
    { header: '電話', field: 'Phone', editable: true, required: true },
    { header: '傳真', field: 'Fex', editable: true, required: false },
    { header: '地址', field: 'Address', editable: true, required: true },
  ];

  //local json location
  public jsonUrl = "../assets/lproperty.json";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.propertyForms = this.fb.array([]);
  }

  ngOnInit(): void {
    this.loadLocalJsonData();

    console.log('相對路徑開啟',this.jsonyData);
  }

  // 讀取json表單
  loadLocalJsonData(): void {
    
    this.http.get<MyProperty[]>(this.jsonUrl).subscribe(
        data => {
          console.log('成功讀取 JSON 數據：', data);
          // 在這裡可以將數據賦值給組件中的屬性，例如 this.localData = data;
        },
        error => {
          console.error('讀取 JSON 數據失敗：', error);
        }
      );
  }
}
