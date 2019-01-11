import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { JsonConvert } from 'json2typescript';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private jsonConvert: JsonConvert;
    constructor(private http: HttpClient,
                private authenticationService: AuthenticationService) {
       this.jsonConvert = new JsonConvert();
    }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
      .pipe(map(users => {
        return this.jsonConvert.deserializeArray(users, User);
      }));
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${id}`)
      .pipe(map(user => {
        return this.jsonConvert.deserialize(user, User);
      }));
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user)
            .pipe(
                tap(_ => {
                    this.updateUserLocal(user);
                })
            );
    }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  changePassword(id: string, oldPassword: string, newPassword: string) {
    return this.http.put(`${environment.apiUrl}/users/${id}/password`, {
      'old_password': oldPassword,
      'new_password': newPassword
    });
  }

  deactivate(id: number) {
    return this.http.put(`${environment.apiUrl}/users/${id}/deactivate`, null);
  }

  search(keyword: string, method: string) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/search/${keyword}/${method}`)
      .pipe(map(users => {
        return this.jsonConvert.deserializeArray(users, User);
      }));
  }

  deleteAccount(id: number, password: string) {
    const body = { id, password };
    const options = ({
      headers: new HttpHeaders({}),
      body
    });
    return this.http.delete(`${environment.apiUrl}/users/deleteAccount`, options);
  }

  forgotPassword(emailObject: { email: string, url: string }) {
    return this.http.post(`${environment.apiUrl}/users/forgot-password`, emailObject);
  }

  resetPassword(passwordObject: { password: string, resetToken: string }) {
    return this.http.post(`${environment.apiUrl}/users/reset-password`, passwordObject);
  }

  updateUserLocal(user: User) {
    const currentUser = this.authenticationService.currentUserValue as User;
    if (!!currentUser && !!user) {
        const mappedUser = this.jsonConvert.deserialize(user, User);
        currentUser.name = mappedUser.name !== undefined && mappedUser.name !== null ? mappedUser.name : currentUser.name ;
        currentUser.bio = mappedUser.bio !== undefined && mappedUser.bio !== null ? mappedUser.bio : currentUser.bio;
        currentUser.company = mappedUser.company !== undefined && mappedUser.company !== null ? mappedUser.company : currentUser.company;
        currentUser.location = mappedUser.location !== undefined && mappedUser.location !== null ? mappedUser.location : currentUser.location;
        currentUser.email = mappedUser.email !== undefined && mappedUser.email !== null ? mappedUser.email : currentUser.email;
        currentUser.username = mappedUser.username !== undefined && mappedUser.username !== null ? mappedUser.username : currentUser.username;
        currentUser.active = mappedUser.active !== undefined && mappedUser.active !== null ? mappedUser.active : currentUser.active;

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.authenticationService.refreshLocalData();
    }
  }
}
