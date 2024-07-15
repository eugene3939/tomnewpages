import { Component } from '@angular/core';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    TabMenuModule,
    RouterModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  items: MenuItem[] = [
    { label: '使用單位建檔', icon: 'pi pi-fw pi-home', routerLink: ['/page1'] },
    { label: '角色管理', icon: 'pi pi-fw pi-calendar', routerLink: ['/page2'] },
    { label: '程式管理', icon: 'pi pi-fw pi-calendar', routerLink: ['/page3'] },
    { label: '使用者帳號管理', icon: 'pi pi-fw pi-calendar', routerLink: ['/page4'] },
    { label: '商品建檔', icon: 'pi pi-fw pi-calendar', routerLink: ['/page5'] },
    { label: '票券商品建檔', icon: 'pi pi-fw pi-calendar', routerLink: ['/page6'] },
    { label: '表單模板', icon: 'pi pi-fw pi-calendar' , routerLink: ['/formTemplate']},
    { label: '聯絡樣式模板', icon: 'pi pi-fw pi-calendar' , routerLink: ['/contactTemplate']},
    { label: '表單模板2', icon: 'pi pi-fw pi-calendar' , routerLink: ['/contactform']},
  ];
}
