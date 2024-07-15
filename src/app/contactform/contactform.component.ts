import { Component, OnInit } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared.module';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss',
})
export class ContactformComponent implements OnInit{ 

  cities: City[] | undefined;
  cityGroup: FormGroup;

  rowForm: FormGroup;

  rowFields = [
    { label: 'First Name', controlName: 'firstName' },
    { label: 'Last Name', controlName: 'lastName' },
    { label: 'Company', controlName: 'company' },
    { label: 'Email', controlName: 'email' },
    { label: 'Phone number', controlName: 'phone' },
    { label: 'Message', controlName: 'message' }
  ];

  constructor(private fb: FormBuilder) {
    // 創建表單
    this.cityGroup = this.fb.group({});
    this.rowForm = this.fb.group({});
    this.rowFields.forEach(field => {
      this.rowForm.addControl(field.controlName, new FormControl(''));
    });
  }

  ngOnInit() {
    this.cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    this.cityGroup = new FormGroup({
        selectedCity: new FormControl<City | null>(null)
    });
  }

}
