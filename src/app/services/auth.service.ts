import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserT {
  _id: string,
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

/**
 * @description This service handles everything authtication related
 * by exposing four methods loadCurrentUser, register, login, and logout
 */
@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  private userSubject: Subject<UserT | null> = new Subject<UserT | null>();
  public userObesrvable: Observable<UserT | null> = this.userSubject.asObservable();

  constructor() { }

  async loadCurrentUser() {
    const userRes = await fetch(`${environment.API_URI}/account/currentUser`, { credentials: 'include' });
    if (!userRes.ok)
      return this.userSubject.next(null);
    const userJson = await userRes.json();
    this.userSubject.next(userJson as UserT);
  }

  async register(args: RegisterArgsT): Promise<boolean> {
    const registerRes = await fetch(`${environment.API_URI}/account/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    return registerRes.ok;
  }

  async login(args: LoginArgsT): Promise<boolean> {
    const loginRes = await fetch(`${environment.API_URI}/account/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    if (!loginRes.ok)
      return false;
    const loginJson = await loginRes.json();
    this.userSubject.next(loginJson as UserT);
    return true;
  }

  async logout(): Promise<boolean> {
    const logoutRes = await fetch(`${environment.API_URI}/account/logout`, { credentials: 'include' });
    return logoutRes.ok;
  }
}
