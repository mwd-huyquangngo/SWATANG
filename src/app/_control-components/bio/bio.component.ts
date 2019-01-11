import { Component, Input } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-bio-input-form-control',
  templateUrl: './bio.component.html'
})
export class BioComponent extends BaseFormControlComponent{

  @Input()
  rows: number = 1;

  constructor() {
    super('bio', 'Bio');
  }
}
