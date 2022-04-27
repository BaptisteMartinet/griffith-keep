import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SnackbarT {
  message: string,
  type: 'success' | 'warning' | 'error',
}

@Injectable({
  providedIn: 'root'
})
export default class SnackbarService {
  private snackbarSubject = new Subject<SnackbarT | null>();
  public snackbarObservable = this.snackbarSubject.asObservable();

  constructor() { }

  show(args: SnackbarT, duration: number) {
    this.snackbarSubject.next(args);
    setTimeout(() => {
      this.snackbarSubject.next(null);
    }, duration);
  }
}
