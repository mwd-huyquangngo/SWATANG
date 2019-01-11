import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { JsonConvert } from 'json2typescript';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public jsonConvert: JsonConvert;

  constructor(private http: HttpClient) {
    this.jsonConvert = new JsonConvert();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const mappedUser = this.jsonConvert.deserialize(user, User);
          localStorage.setItem('currentUser', JSON.stringify(mappedUser));
          this.currentUserSubject.next(mappedUser);
        }

        return user;
      }));
  }

  logout() {
    this.http.post<any>(`${environment.apiUrl}/users/logout`, null).subscribe();
    // remove user from local storage to log user out
    this.invalidate();
  }

  invalidate() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

    refreshLocalData() {
        this.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser')));
    }
}
