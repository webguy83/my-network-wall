import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  _user: IUser | null = null;

  get user() {
    return this._user;
  }

  set user(user: IUser | null) {
    this._user = user;
  }

  buildUser(data: any) {
    return this.http.post<IUser>('http://localhost:3000/users', data);
  }

  getUser(email: string) {
    return this.http.get<IUser[]>(`http://localhost:3000/users?email=${email}`);
  }
}
