import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared.module';
import { Router } from '@angular/router'; // 确保这里引入了 Router
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedModuleModule,
  ],
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss'
})
export class AddFormComponent {
  addDataForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.addDataForm = this.fb.group({
      role: [''],
      name: [''],
      unitNo: [''],
      program_member: [''],
      program: [''],
    });
  }

  onAddData() {
    const newData = this.addDataForm.value;
    // 发送 POST 请求将 newData 写入 JSON 文件
    this.http.post<any>('assets/roles.json', newData).subscribe(
      response => {
        localStorage.setItem('new-role-data', JSON.stringify(newData)); //寫入localstorage

        console.log('localStorage saved successfully:', localStorage.getItem('new-role-data'));

  
        // 导航回 Page2Component
        this.router.navigate(['page2'], { state: { newData } });
      },
      error => {
        console.error('Error saving data:', error);
      }
    );
  }
}
