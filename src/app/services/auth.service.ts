import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface UserT {
  firstName: string,
  lastName: string,
  email: string,
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
}
