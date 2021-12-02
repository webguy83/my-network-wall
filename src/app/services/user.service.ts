import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IJSONData {
  users: any[];
  posts: any[];
}

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

  buildUser(data: any) {
    return this.http.post<IJSONData>('http://localhost:3000/users', data);
  }

  getUser(email: string) {
    return this.http.get<ILoginData[]>(
      `http://localhost:3000/users?email=${email}`
    );
  }
}