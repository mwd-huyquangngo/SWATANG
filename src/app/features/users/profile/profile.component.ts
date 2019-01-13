import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldSpecifications } from '@shared/specs';
import { User } from '@core/models';
import { AlertService, AuthenticationService, UserService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User;
  updateProfileForm: FormGroup;
  loading = false;
  submitted = false;
  currentUserSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  ngOnInit() {
    this.updateProfileForm = this.formBuilder.group({
      id: [''],
      name: ['', FieldSpecifications.Name],
      bio: ['', FieldSpecifications.Bio],
      company: ['', FieldSpecifications.Company],
      location: ['', FieldSpecifications.Location]
    });
    this.loadProfileData(this.currentUser);
  }

  get f() {
    return this.updateProfileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateProfileForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.update(this.updateProfileForm.value)
      .subscribe(
        _ => {
          this.alertService.success('Profile updated successfully.', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.submitted = false;
          this.loading = false;
        });
  }

  private loadProfileData(user : User): void {
    this.updateProfileForm.setValue(
      {
        id: user.id,
        name: !!user.name ? user.name : '',
        bio: !!user.bio ? user.bio : '',
        company: !!user.company ? user.company : '',
        location: !!user.location ? user.location : ''
      });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
