import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    TableModule,
    InputGroupAddonModule,
    ToastModule,
    DropdownModule,
    TagModule,
    ConfirmDialogModule,
    DialogModule,
    ConfirmPopupModule,
    HttpClientModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    InputGroupModule,
    ButtonModule,
    TableModule,
    InputGroupAddonModule,
    ToastModule,
    DropdownModule,
    TagModule,
    ConfirmDialogModule,
    DialogModule,
    ConfirmPopupModule,
    HttpClientModule,
  ],
})
export class SharedModuleModule { }
