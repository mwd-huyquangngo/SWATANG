import { Validators } from '@angular/forms';
import { FieldValidators } from '../validation/field-validator';

export class FieldSpecifications {
  static EmailAddress = [Validators.required, FieldValidators.emailAddress()];
  static Password = [
    Validators.required,
    FieldValidators.atLeastFourAlphabeticValidator(),
    Validators.minLength(8),
    FieldValidators.atLeastOneNonAlphabeticValidator()
  ];
  static SimplePassword = [Validators.required, Validators.minLength(8)];
  static Username = [Validators.required, Validators.minLength(6), FieldValidators.username()];
  static Name = [Validators.required, Validators.maxLength(50)];
  static Company = [Validators.required, Validators.maxLength(50)];
  static Location = [Validators.required, Validators.maxLength(100)];
  static Bio = [Validators.required, Validators.maxLength(255)];
}
