import { Injectable } from '@angular/core';

interface UserT {
  firstName: string,
  lastName: string,
  email: string,
}

@Injectable()
export class Globals {
  authenticated: boolean = false;
  user: UserT = {
    firstName: '',
    lastName: '',
    email: '',
  };
}
