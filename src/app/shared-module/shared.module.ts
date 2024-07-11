import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ImageModule } from 'primeng/image';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HttpClientModule } from '@angular/common/http';
import { KeyFilterModule } from 'primeng/keyfilter';

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
    ImageModule,
    ToastModule,
    DropdownModule,
    TagModule,
    ConfirmDialogModule,
    DialogModule,
    ConfirmPopupModule,
    KeyFilterModule,
    InputSwitchModule,
    DividerModule,
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
    ImageModule,
    ToastModule,
    DropdownModule,
    TagModule,
    ConfirmDialogModule,
    DialogModule,
    ConfirmPopupModule,
    KeyFilterModule,
    InputSwitchModule,
    DividerModule,
    HttpClientModule,
  ],
})
export class SharedModuleModule { }
