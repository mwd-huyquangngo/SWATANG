import { Component } from '@angular/core';
import { BaseFormControlComponent } from '../base-form-control.component';

@Component({
  selector: 'app-location-input-form-control',
  templateUrl: './location.component.html'
})
export class LocationComponent extends BaseFormControlComponent {

  constructor() {
    super('location', 'Location');
  }
}
