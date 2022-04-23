import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {

  constructor(public globals: Globals, public router: Router) { }

  async ngOnInit() {
    try {
      const userRes = await fetch(`${environment.API_URI}/currentUser`, { credentials: 'include' });
      if (userRes.ok) {
        this.globals.user = await userRes.json();
        this.globals.authenticated = true;
      }
    } catch { }
    if (!this.globals.authenticated)
      this.router.navigate(['login']);
    else
      this.router.navigate([ '/' ]);
  }
}
