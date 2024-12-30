import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER } from '../model/userM';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  api: string = 'http://localhost:3000';
  UserLoggedSubject = new BehaviorSubject<boolean>(this.userCheck());
  userCheck$: Observable<boolean> = this.UserLoggedSubject.asObservable();

  constructor(private http: HttpClient) {}
  createUser(user: USER): Observable<boolean> {
    return this.http.post(this.api + '/users', user).pipe(
      map(() => true),
      catchError((error) => {
        console.error('Error creating user:', error);
        return of(false);
      })
    );
  }
  LoginUser(
    email: string,
    pass: string
  ): Observable<{ status: boolean; message: string }> {
    return this.http.get<USER[]>(this.api + `/users?email=${email}`).pipe(
      map((users) => {
        if (users && users.length > 0) {
          const user = users[0];
          const passMatch = bcrypt.compareSync(pass, user?.password);
          if (passMatch) {
            return {
              status: true,
              message: 'Logined successfully!',
            };
          } else {
            return {
              status: false,
              message: 'Invalid password!',
            };
          }
        } else {
          return {
            status: false,
            message: 'User not found!',
          };
        }
      })
    );
  }
  saveUserLoginInLS(bool: boolean) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isUserLogged', JSON.stringify(bool));
      this.UserLoggedSubject.next(bool);
    }
  }
  userCheck(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const isLogged = localStorage.getItem('isUserLogged');
      return isLogged ? JSON.parse(isLogged) : false;
    }
    return false;
  }
}
