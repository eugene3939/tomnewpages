import { Component } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared.module';
import { FormControl, FormArray, FormBuilder,FormGroup,FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    SharedModuleModule,
    FormsModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  textAreaValue!: string;

  propertyForms: FormGroup;               // 用FormArray管理table顯示內容

  constructor(private fb: FormBuilder) {
    this.propertyForms = this.fb.group({
      date: [''],
      title: [''],
      signProcess: [''],
      signePerson: [''],
      patch: [''],
      shared: [''],
      signPaper: [''],
      attach: [''],
      tag: [''],
    });
  }
}
