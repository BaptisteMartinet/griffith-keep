import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface UserT {
  firstName: string,
  lastName: string,
  email: string,
}

interface LoginArgsT {
  email: string,
  password: string,
}

interface RegisterArgsT {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  user: UserT | null = null;
  userSubject: Subject<UserT | null> = new Subject<UserT | null>();

  constructor() {
    this.userSubject.subscribe(value => { this.user = value });
  }

  async loadCurrentUser() {
    const userRes = await fetch(`${environment.API_URI}/currentUser`, { credentials: 'include' }).catch();
    if (!userRes.ok)
      return this.userSubject.next(null);
    const userJson = await userRes.json();
    this.userSubject.next(userJson);
  }

  async register(args: RegisterArgsT): Promise<boolean> {
    const registerRes = await fetch(`${environment.API_URI}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    return registerRes.ok;
  }

  async login(args: LoginArgsT): Promise<boolean> {
    const loginRes = await fetch(`${environment.API_URI}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    return loginRes.ok;
  }

  async logout(): Promise<boolean> {
    const logoutRes = await fetch(`${environment.API_URI}/logout`, { credentials: 'include' });
    return logoutRes.ok;
  }
}
