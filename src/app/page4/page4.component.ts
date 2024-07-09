// 編輯表單
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
import { UserInfo } from '../object/UserInfo';

@Component({
  selector: 'app-page4',
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
  templateUrl: './page4.component.html',
  styleUrl: './page4.component.scss'
})
export class Page4Component implements OnInit{
  searchRole: string = '';
  searchName: string = '';

  propertyForms: FormArray;               // 用FormArray管理table顯示內容
  filteredForms: FormArray;               // 篩選的表單內容
  rowNameForms: FormGroup;                // 欄位名稱
  editForm: FormGroup;                    // 編輯表單
  beforeEditingItem: FormGroup;           // 目前編輯中的項目
  
  //local json location
  public jsonUrl = "assets/userInfo.json";

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
  createForms(data: UserInfo[]): void {
    data.forEach(item => {
      this.propertyForms.push(this.createFormGroup(item));
    });
  }

  createFormGroup(item: UserInfo): FormGroup {
    return this.fb.group({
      Code: [item.code],
      Name: [item.name],
      EngName: [item.EngName],
      Pas: [item.pas],
      Limit: [item.limit],
      StartDate: [item.startDate],
      EndDate: [item.endDate],
      Lock: [item.lock],
      StopAccess: [item.stopAccess],
      PasEdit: [item.pasEdit],
      Email: [item.email],
      UnitNo: [item.unitNo],
      Role: [item.role],
    });
  }

  createEditForm(): FormGroup {
    return this.fb.group({
      Code: ['', Validators.required],
      Name: ['', Validators.required],
      EngName: ['', Validators.required],
      Pas: ['', Validators.required],
      Limit: ['', Validators.required],
      StartDate: { value: '', disabled: true },
      EndDate: { value: '', disabled: true },
      Lock: ['', Validators.required],
      StopAccess: ['', Validators.required],
      PasEdit: ['', Validators.required],
      Email: ['', Validators.required],
      UnitNo: ['', Validators.required],
      Role: ['', Validators.required],
    });
  }

  createRowNameForm(): FormGroup {
    return this.fb.group({
      Code: ['使用者代號', Validators.required],
      Name: ['中文姓名', Validators.required],
      EngName: ['英文姓名', Validators.required],
      Pas: ['密碼', Validators.required],
      Limit: ['登入系統限制', Validators.required],
      StartDate: ['開始日期', Validators.required],
      EndDate: ['結束日期', Validators.required],
      Lock: ['帳戶鎖定', Validators.required],
      StopAccess: ['暫停使用', Validators.required],
      PasEdit: ['密碼修改', Validators.required],
      Email: ['電子郵件', Validators.required],
      UnitNo: ['單位編號', Validators.required],
      Role: ['角色', Validators.required],
    });
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
      const editedRole = editedData.Role; // 假設有一個唯一識別符 id

      // 在 filteredForms 中找到具有相同 id 的表單
      const index = this.filteredForms.controls.findIndex(form => form.value.Role === editedRole);

      if (index !== -1) {
        this.filteredForms.at(index).patchValue(editedData); // 更新 filteredForms 中的對應行數據

        // 在 propertyForms 中找到具有相同 id 的表單
        const propertyIndex = this.propertyForms.controls.findIndex(form => form.value.Role === editedRole);
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
