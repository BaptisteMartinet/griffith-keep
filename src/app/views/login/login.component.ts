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
    const loginStatus = await this.authService.login({
      email: 'baptiste.martinet@student.griffith.ie',
      password: 'test',
    });
    if (loginStatus)
      window.location.replace('/');
  }

}
