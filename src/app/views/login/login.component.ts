import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    public authService: AuthService,
  ) {
    this.titleService.setTitle('Griffith Keep - Login');
  }

  ngOnInit(): void {
    this.authService.userSubject.subscribe(user => { if (user) this.router.navigate([ '/' ]); });
  }

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
