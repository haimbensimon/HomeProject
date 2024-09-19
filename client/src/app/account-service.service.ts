import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { loginUser } from './account/models/loginModel';
import { registerUser } from './account/models/registerModel';
import { User } from './account/models/User';

@Injectable({
  providedIn: 'root',
})
export class AccountServiceService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:44367/api';
  currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
  register(model: registerUser): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/Account/Register', model);
  }

  login(model: loginUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Account/Login`, model).pipe(
      map((respone: User) => {
        const user = respone;

        if (user) {
          // localStorage.setItem('user', JSON.stringify(user));
          // this.currentUserSource.next(user);
          this.setCurrentUser(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logOut() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
