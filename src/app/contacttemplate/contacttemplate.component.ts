import { Component } from '@angular/core';
import { SharedModuleModule } from '../shared-module/shared.module';

@Component({
  selector: 'app-contacttemplate',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './contacttemplate.component.html',
  styleUrl: './contacttemplate.component.scss'
})
export class ContacttemplateComponent {
  checked: boolean = false;
}

