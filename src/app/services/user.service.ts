import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ILoginData {
  email: string;
  password: string;
  username: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  _user: ILoginData | null = null;

  get user() {
    return this._user;
  }

  set user(user: ILoginData | null) {
    this._user = user;
  }

  buildUser(data: any) {
    return this.http.post<ILoginData>('http://localhost:3000/users', data);
  }

  getUser(email: string) {
    return this.http.get<ILoginData[]>(
      `http://localhost:3000/users?email=${email}`
    );
  }
}
