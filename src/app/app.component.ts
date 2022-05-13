import { Component, OnInit } from '@angular/core';
import { AuthService, SnackbarService } from './services';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-note-update-dialog></app-note-update-dialog>
    <app-snackbar></app-snackbar>
  `,
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthService, private snackbarService: SnackbarService) { }

  async ngOnInit() {
    try {
      await this.authService.loadCurrentUser();
    } catch {
      this.snackbarService.show({ message: 'Unable to fetch from the server. Please retry in 30 seconds.', type: 'warning' }, 'extra_long');
    }
  }
}
