import { Component } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared.module';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-contacttemplate',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './contacttemplate.component.html',
  styleUrl: './contacttemplate.component.scss'
})
export class ContacttemplateComponent {
  form: FormGroup;
  checked: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.inputFields.forEach(field => {
      this.form.addControl(field.controlName, new FormControl(''));
    });
  }

  inputFields = [
    { label: 'First Name', controlName: 'firstName' },
    { label: 'Last Name', controlName: 'lastName' },
    { label: 'Company', controlName: 'company' },
    { label: 'Email', controlName: 'email' },
    { label: 'Phone number', controlName: 'phone' },
    { label: 'Message', controlName: 'message' }
  ];
  
}

