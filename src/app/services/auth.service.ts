import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('user', 'admin');
      localStorage.setItem('token', 'mock-token-admin');
      return true;
    } else if (username === 'user' && password === 'password') {
      localStorage.setItem('user', 'user');
      localStorage.setItem('token', 'mock-token-user');
      return true;
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userName') !== null;
  }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('jwt');
  }
}
