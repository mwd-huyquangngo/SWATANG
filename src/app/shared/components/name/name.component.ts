import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-name-input-form-control',
  templateUrl: './name.component.html'
})
export class NameComponent extends BaseFormControlComponent {

  constructor() {
    super('name', 'Name');
  }
}
