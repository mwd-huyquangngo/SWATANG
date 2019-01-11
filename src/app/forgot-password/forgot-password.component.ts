import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService } from '@app/_services';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;

    const emailObject = {
      email: this.f.email.value,
      url: window.location.href
    };

    this.subscription = this.userService.forgotPassword(emailObject)
      .pipe(first())
      .subscribe(() => {
          this.alertService.success(
            'We have sent you an email with a link to reset your password. Please check your mailbox.', true);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
