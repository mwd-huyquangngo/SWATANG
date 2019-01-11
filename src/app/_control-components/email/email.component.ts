import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-email-input-form-control',
  templateUrl: './email.component.html'
})
export class EmailComponent extends BaseFormControlComponent {

  constructor() {
    super('email', 'Email');
  }
}
