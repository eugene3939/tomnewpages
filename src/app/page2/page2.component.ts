import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared.module';
import { Router } from '@angular/router'; // 确保这里引入了 Router
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedModuleModule,
  ],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})
export class Page2Component implements OnInit{
  filterForm: FormGroup;
  data: any[];
  filteredData: any[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    ) {
    this.filterForm = this.fb.group({
      role: [''],           //角色代碼
      name: [''],           //角色名稱
      unitNo: [''],         //單位編號
      program_member: [''], //程式項目 (管理)
      program: [''],        //程式項目 (會員管理)
    });

    // 初始化空数据
    this.data = [];
    this.filteredData = []; // 初始化筛选后的数据为空
  }

  ngOnInit() {
    // 加载默认数据
    this.loadLocalJsonData();
    // 確認有無新寫入的local storage 有就載入
    this.loadLocalStorageData();
  }

  loadLocalJsonData() {
    this.http.get<any[]>('assets/roles.json').subscribe(
      data => {
        console.log('讀取資料',this.data);
        this.data = data;
        this.filteredData = [...this.data]; // 更新筛选后的数据
      },
      error => {
        console.error('Error loading default data:', error);
      }
    );
  }

  // 讀取 local storage 資料
  loadLocalStorageData() {
    const newRoleData = localStorage.getItem('new-role-data');
    if (newRoleData) {
      const parsedData = JSON.parse(newRoleData);
      this.addData(parsedData);
      console.log('localStorage saved successfully:', parsedData);
    }
  }

  addData(newData: any) {
    this.data.push(newData);
    this.filteredData = [...this.data]; // 更新筛选后的数据
  }

  onFilter() {
    const filterValues = this.filterForm.value;

    this.filteredData = this.data.filter(item =>
      (filterValues.role === '' || item.role.includes(filterValues.role)) &&
      (filterValues.name === '' || item.name.includes(filterValues.name))
    );
  }

  openAddDataPage() {
    this.router.navigate(['/add-form']);
  }
}
