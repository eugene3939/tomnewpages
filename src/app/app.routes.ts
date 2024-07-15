import { Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { Page4Component } from './page4/page4.component';
import { Page5Component } from './page5/page5.component';
import { AddFormComponent } from './add-form/add-form.component';
import { Page6Component } from './page6/page6.component';
import { FormtemplateComponent } from './formtemplate/formtemplate.component';
import { ContacttemplateComponent } from './contacttemplate/contacttemplate.component';
import { PaymentComponent } from './payment/payment.component';
import { InvoiceComponent } from './invoice/invoice.component';

export const routes: Routes = [
{ path: '', redirectTo: '/page1', pathMatch: 'full' },
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: 'page3', component: Page3Component },
  { path: 'page4', component: Page4Component },
  { path: 'page5', component: Page5Component },
  { path: 'page6', component: Page6Component },
  { path: 'formTemplate', component: FormtemplateComponent },
  { path: 'contactTemplate', component: ContacttemplateComponent },
  { path: 'add-form', component: AddFormComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'invoice', component: InvoiceComponent},
];
