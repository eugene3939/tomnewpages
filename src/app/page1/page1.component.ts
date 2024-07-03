import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared.module';
//form builder
import { FormArray, FormBuilder, Validators } from '@angular/forms';
//service
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { Observable } from 'rxjs';

import { MyProperty } from '../object/MyProperty';
import { Page2Component } from '../page2/page2.component';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [SharedModuleModule],
  providers:[
    ConfirmationService,
    DialogService,
    HttpClient,
    MessageService,
  ],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component implements OnInit{
  propertyForms: FormArray;               // 用FormArray管理table顯示內容

  cols = [  // 欄位名稱 (能否編輯)
    { header: '單位編號', field: 'UnitNo', editable: true, required: true },
    { header: '單位名稱', field: 'UnitName', editable: true, required: true },
    { header: '統一編號', field: 'UnitCode', editable: true, required: true },
    { header: '電話', field: 'Phone', editable: true, required: true },
    { header: '傳真', field: 'Fex', editable: true, required: false },
    { header: '地址', field: 'Address', editable: true, required: true },
  ];

  //local json location
  public jsonUrl = "assets/lproperty.json";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private dialogService: DialogService,
  ) {
    this.propertyForms = this.fb.array([]);
  }

  ngOnInit(): void {
    this.getJsonData(this.jsonUrl).subscribe(
      data => {
        this.createForms(data); // 根據 JSON 數據建立表單控件
        console.log('成功讀取 JSON 數據：', this.propertyForms);
      },
      error => {
        console.error('讀取 JSON 數據失敗：', error);
      }
    );
  }

  // 根據 JSON 數據建立表單控件
  createForms(data: MyProperty[]): void {
    data.forEach(item => {
      const group = this.fb.group({
        UnitNo: [item.UnitNo],
        UnitName: [item.UnitName],
        UnitCode: [item.UnitCode],
        Phone: [item.Phone],
        Fex: [item.Fex],
        Address: [item.Address]
      });
      this.propertyForms.push(group); // 將每個 FormGroup 添加到 FormArray 中
    });
  }

  // 新增row
  addForm(): void {
    const newForm = this.fb.group({
      UnitNo: ['', Validators.required],
      UnitName: ['', Validators.required],
      UnitCode: ['', Validators.required],
      Phone: ['', Validators.required],
      Fex: [''],
      Address: ['', Validators.required]
    });
    this.propertyForms.push(newForm); // 將新建的 FormGroup 添加到 FormGroup 陣列中
    //重新讀取表單
    console.log('新增成功',this.propertyForms.value)
  }


  //刪除row
  deleteItem(index: number): void {
    if (index !== -1) {
      this.propertyForms.removeAt(index); // 從 FormArray 中刪除指定行
      console.log('刪除成功',this.propertyForms.length)
      this.messageService.add({ severity: 'info', summary: 'Info Message', detail: 'Message Content', key: 'tl', life: 3000 });
    }
  }

  //開啟新Dialoge
  openDialog() {
    console.log('hello');
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  getJsonData(url: string): Observable<any>{
    return this.http.get<any>(url);
  }
}
