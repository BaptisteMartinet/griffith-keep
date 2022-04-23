import { Component, OnInit } from '@angular/core';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthService) { }

  async ngOnInit() {
    await this.authService.loadCurrentUser();
  }
}
