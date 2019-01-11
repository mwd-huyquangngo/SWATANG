import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-password-input-form-control',
  templateUrl: './password.component.html'
})
export class PasswordComponent extends BaseFormControlComponent {

  constructor() {
    super('password', 'Password');
  }
}
