import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { AlertService, AuthenticationService, UserService } from '@app/_services';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html'
})
export class DeleteAccountComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentUserSubscription: Subscription;
  loading = false;
  submitted = false;
  deleted = false;
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authenticateService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUserSubscription = this.authenticateService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  get f() { return this.passwordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.deleteAccount(this.currentUser.id, this.f.password.value)
      .pipe(first())
      .subscribe(
        _ => {
          this.deleted = true;
          // this.authenticateService.logout();
          this.authenticateService.invalidate();
          this.router.navigate(['/login']);
          this.alertService.success('Your account has been deleted.', true);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}