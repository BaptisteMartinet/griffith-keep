import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { SnackbarService } from '../../services';
import type { SnackbarT } from '../../services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export default class SnackbarComponent implements OnInit, OnDestroy {
  private snackbarSubscription: Subscription | null = null;
  public snackbarState: SnackbarT | null = null;

  constructor(public snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.snackbarSubscription = this.snackbarService.snackbarObservable.subscribe(state => { this.snackbarState = state });
  }

  ngOnDestroy(): void {
    this.snackbarSubscription?.unsubscribe();
  }

}
