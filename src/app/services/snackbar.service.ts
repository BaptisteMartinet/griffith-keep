import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SnackbarT {
  message: string,
  type: 'success' | 'warning' | 'error',
}

export type DurationT = 'short' | 'long' | 'extra_long';

const Durations = new Map<DurationT, number>([
  [ 'short', 2000 ],
  [ 'long', 3000 ],
  [ 'extra_long', 5000 ],
]);

/**
 * @description A service to manage weither or not
 * the application snackbar should be shown.
 */
@Injectable({
  providedIn: 'root'
})
export default class SnackbarService {
  private snackbarSubject = new Subject<SnackbarT | null>();
  public snackbarObservable = this.snackbarSubject.asObservable();

  constructor() { }

  show(args: SnackbarT, duration: DurationT = 'short') {
    this.snackbarSubject.next(args);
    setTimeout(() => {
      this.snackbarSubject.next(null);
    }, Durations.get(duration));
  }
}
