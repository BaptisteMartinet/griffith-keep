import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  public async submitLogin() {
    const loginRes = await fetch(`${environment.API_URI}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'baptiste.martinet@student.griffith.ie',
        password: 'test',
      }),
    });
    console.log(loginRes.ok);
  }

}
