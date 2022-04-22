import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (public globals: Globals) {}

  async ngOnInit() {
    // fake login
    // const test = await fetch(`${environment.API_URI}/user/login`, {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email: 'baptiste.martinet@student.griffith.ie',
    //     password: 'test',
    //   }),
    // });
    // console.log(test.ok);
    const userRes = await fetch(`${environment.API_URI}/currentUser`, { credentials: 'include' });
    if (!userRes.ok)
      return;
    this.globals.user = await userRes.json();
    this.globals.authenticated = true;
  }
}
