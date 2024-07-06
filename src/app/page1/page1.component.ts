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

import { MyProperty } from '../object/MyProperty';

@Component({
  selector: 'app-page1',
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
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component implements OnInit{
  searchUnitNo: string = '';
  searchUnitName: string = '';

  propertyForms: FormArray;               // 用FormArray管理table顯示內容
  filteredForms: FormArray;               // 篩選的表單內容
  rowNameForms: FormGroup;                // 欄位名稱
  editForm: FormGroup;                    // 編輯表單

  //local json location
  public jsonUrl = "assets/lproperty.json";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.propertyForms = this.fb.array([]);
    this.filteredForms = this.fb.array([]);

    this.rowNameForms = this.fb.group({ //建立欄位名稱formgroup
      UnitNo: ['單位編號', Validators.required],
      UnitName: ['單位名稱', Validators.required],
      UnitCode: ['統一編號', [Validators.required]],
      Phone: ['電話', [Validators.required]],
      Fex: ['傳真', [Validators.required]],
      Address: ['地址', [Validators.required]],
    });

    this.editForm = this.fb.group({ //建立編輯表單
      UnitNo: [{ value: '', disabled: true }, Validators.required], // 使用 disabled 屬性來禁用編輯
      UnitName: ['', Validators.required],
      UnitCode: ['', Validators.required],
      Phone: ['', Validators.required],
      Fex: [''],
      Address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getJsonData(this.jsonUrl).subscribe(
      data => {
        this.createForms(data); // 根據 JSON 數據建立表單控件
        this.filteredForms = this.propertyForms;  //篩選表單
        this.editForm.patchValue(this.filteredForms.at(0).value); //編輯表單初始為first row
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

  //篩選表單
  filterForms(): void {
    const searchUnitNo = this.searchUnitNo.trim().toLowerCase();
    const searchUnitName = this.searchUnitName.trim().toLowerCase();

    this.filteredForms = this.fb.array(
      this.propertyForms.controls.filter(group => {
        const unitNo = group.get('UnitNo')?.value?.toLowerCase() ?? '';
        const unitName = group.get('UnitName')?.value?.toLowerCase() ?? '';
        const unitNoMatch = searchUnitNo ? unitNo.includes(searchUnitNo) : true;
        const unitNameMatch = searchUnitName ? unitName.includes(searchUnitName) : true;
        return unitNoMatch && unitNameMatch;
      })
    );

    console.log('篩選結果', this.filteredForms.value);
  }

  //新增row
  addForm(): void {
    const newForm = this.fb.group({
      UnitNo: ['新增編號', Validators.required],
      UnitName: ['新增名稱', Validators.required],
      UnitCode: ['新增統編', Validators.required],
      Phone: ['新增電話', Validators.required],
      Fex: ['新增傳真'],
      Address: ['新增地址', Validators.required]
    });
    this.propertyForms.push(newForm); // 將新建的 FormGroup 添加到 FormGroup 陣列中
    this.filteredForms = this.propertyForms //更新篩選清單

    //重新讀取表單
    console.log('新增成功',this.propertyForms.value)
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

  //儲存編輯後的row
  saveEditRow(): any{
    if (this.editForm.valid) {
      const editedData = this.editForm.value; // 獲取編輯後的表單值
      const editedNo = editedData.UnitNo; // 假設有一個唯一識別符 id

      // 在 filteredForms 中找到具有相同 id 的表單
      const index = this.filteredForms.controls.findIndex(form => form.value.UnitNo === editedNo);

      if (index !== -1) {
        this.filteredForms.at(index).patchValue(editedData); // 更新 filteredForms 中的對應行數據

        // 在 propertyForms 中找到具有相同 id 的表單
        const propertyIndex = this.propertyForms.controls.findIndex(form => form.value.UnitNo === editedNo);
        if (propertyIndex !== -1) {
          this.propertyForms.at(propertyIndex).patchValue(editedData); // 更新 propertyForms 中的對應行數據
          console.log('儲存編輯成功', editedData);
          // 可以加入其他相應的提示或處理邏輯
        }
      } else {
        console.warn('找不到要編輯的行');
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
