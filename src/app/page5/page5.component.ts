//商品建檔
import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared.module';
//form builder
import { FormArray, FormBuilder,FormGroup,FormsModule, Validators } from '@angular/forms';
//service
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { Observable } from 'rxjs';
import { MerchantUnit } from './../object/MerchantUnit';

@Component({
  selector: 'app-page5',
  standalone: true,
  imports: [
    SharedModuleModule,
    FormsModule,
  ],
  providers:[
    ConfirmationService,
    DialogService,
    HttpClient,
    MessageService,
  ],
  templateUrl: './page5.component.html',
  styleUrl: './page5.component.scss'
})
export class Page5Component implements OnInit{
  searchRole: string = '';
  searchName: string = '';

  propertyForms: FormArray;               // 用FormArray管理table顯示內容
  filteredForms: FormArray;               // 篩選的表單內容
  rowNameForms: FormGroup;                // 欄位名稱
  editForm: FormGroup;                    // 編輯表單
  beforeEditingItem: FormGroup;           // 目前編輯中的項目

  //local json location
  public jsonUrl = "assets/merchantUnit.json";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.propertyForms = this.fb.array([]);
    this.filteredForms = this.fb.array([]);
    this.beforeEditingItem = this.fb.group([]);
    this.rowNameForms = this.createRowNameForm();   ////建立欄位名稱formgroup
    this.editForm = this.createEditForm();          //建立編輯表單
  }

  ngOnInit(): void {
    this.getJsonData(this.jsonUrl).subscribe(
      data => {
        this.createForms(data); // 根據 JSON 數據建立表單控件
        this.filteredForms = this.propertyForms;  //篩選表單
        this.editForm.patchValue(this.filteredForms.at(0).value); //編輯表單初始為first row
        this.beforeEditingItem = this.editForm;                   //編輯row回歸編輯前的狀態
        console.log('成功讀取 JSON 數據：', this.propertyForms);
      },
      error => {
        console.error('讀取 JSON 數據失敗：', error);
      }
    );
  }

  // 根據 JSON 數據建立表單控件
  createForms(data: MerchantUnit[]): void {
    data.forEach(item => {
      this.propertyForms.push(this.createFormGroup(item));
    });
  }

  createFormGroup(item: MerchantUnit): FormGroup {
    return this.fb.group({
      No: [item.no],
      Name: [item.name],
      Unit: [item.unit],
      Cash: [item.cash],
      AvalibleDate: [item.avalibleDate],
      SerialNo: [item.serialNo],
    });
  }

  createEditForm(): FormGroup {   //
    return this.fb.group({
      No: ['', Validators.required],
      Name: ['', Validators.required],
      Unit: ['', Validators.required],
      Cash: ['', Validators.required],
      AvalibleDate: ['', Validators.required],
      SerialNo: ['', Validators.required],
    });
  }

  createRowNameForm(): FormGroup {
    return this.fb.group({
      No: ['商品編號', Validators.required],
      Name: ['商品名稱', Validators.required],
      Unit: ['單位', Validators.required],
      Cash: ['面額', Validators.required],
      AvalibleDate: ['有效天數', Validators.required],
      SerialNo: ['序號管理', Validators.required],
    });
  }

  //篩選表單
  filterForms(): void {
    const SearchName = this.searchName.trim().toLowerCase();
    const SearchNo = this.searchRole.trim().toLowerCase();

    this.filteredForms = this.fb.array(
      this.propertyForms.controls.filter(group => {
        const name = group.get('Name')?.value?.toLowerCase() ?? '';
        const no = group.get('No')?.value?.toLowerCase() ?? '';
        const unitNameMatch = SearchName ? name.includes(SearchName) : true;
        const unitNoleMatch = SearchNo ? no.includes(SearchNo) : true;
        return unitNameMatch && unitNoleMatch;
      })
    );

    console.log('篩選結果', this.filteredForms.value);
  }

  // 新增表單
  addForm(): void {
    if (this.editForm.valid) {
      const newForm = this.createFormGroup(this.editForm.value);

      if (this.propertyForms.controls.some(form => form.value.No === newForm.value.No)) {
        console.warn('已存在相同的單位編號，請修改後再試。');
        return;
      }

      this.propertyForms.push(newForm);
      this.filteredForms = this.propertyForms;
      console.log('新增成功', this.propertyForms.value);
    } else {
      console.warn('編輯表單無效，無法新增');
    }
  }

  //刪除row
  deleteItem(index: any): void {
    const formToRemove = this.filteredForms.at(index);
    
    if (formToRemove) {
      // 找到在 propertyForms 中的索引
      const propertyIndex = this.propertyForms.controls.indexOf(formToRemove);
      if (propertyIndex !== -1) {
        this.propertyForms.removeAt(propertyIndex); // 從 propertyForms 中刪除指定行
        console.log('刪除成功', this.propertyForms.length);

        // 更新 filteredForms，以反映刪除後的 propertyForms
        this.filteredForms = this.propertyForms;
        
        this.messageService.add({ severity: 'success', summary: '成功', detail: '刪除成功' });
      }
    }

    this.filteredForms = this.propertyForms //更新篩選清單
  }

  //編輯row
  editItem(item : any): void{
    this.editForm.patchValue(item); // 將選中的行數據設置到編輯表單中
    console.log('編輯成功', item);
  }

  //回到編輯前的狀態
  backtoEditMode(): void{
    console.log('先前狀態',this.beforeEditingItem.value)
    this.editForm.patchValue(this.beforeEditingItem.value); //編輯row設置回歸編輯前的狀態
  }

  //儲存編輯後的row
  saveEditRow(): any{
    if (this.editForm.valid) {
      const editedData = this.editForm.value; // 獲取編輯後的表單值
      const editedNo = editedData.No; // 假設有一個唯一識別符 id

      // 在 filteredForms 中找到具有相同 id 的表單
      const index = this.filteredForms.controls.findIndex(form => form.value.No === editedNo);

      if (index !== -1) {
        this.filteredForms.at(index).patchValue(editedData); // 更新 filteredForms 中的對應行數據

        // 在 propertyForms 中找到具有相同 id 的表單
        const propertyIndex = this.propertyForms.controls.findIndex(form => form.value.No === editedNo);
        if (propertyIndex !== -1) {
          this.propertyForms.at(propertyIndex).patchValue(editedData); // 更新 propertyForms 中的對應行數據
          console.log('儲存編輯成功', editedData);
          // 可以加入其他相應的提示或處理邏輯
        }
      } else {
        console.warn('找不到要編輯的行');
        console.log('編輯行',this.editForm.value)

      }
    } else {
      console.warn('編輯表單無效，無法儲存');
    }
  }


  // 取得json資料
  getJsonData(url: string): Observable<any>{
    return this.http.get<any>(url);
  }

}
