import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@core/models';
import { AuthenticationService, UserService } from '@core/services';

@Component({ templateUrl: 'home-page.component.html' })
export class HomePageComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: string) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  deactivateUser(id: string) {
    this.userService.deactivate(id).pipe(first()).subscribe(() => {
      if (this.currentUser.id === id) {
        this.authenticationService.invalidate();
        this.router.navigate(['/login']);
      } else {
        this.loadAllUsers();
      }
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }
}
