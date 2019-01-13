import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-company-input-form-control',
  templateUrl: './company.component.html'
})
export class CompanyComponent extends BaseFormControlComponent {

  constructor() {
    super('company', 'Company');
  }
}
