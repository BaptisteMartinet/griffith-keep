import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AuthService, SnackbarService } from 'src/app/services';

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
    private snackbarService: SnackbarService,
  ) {
    this.titleService.setTitle('Griffith Keep - Login');
  }

  ngOnInit(): void {
    this.authService.userObesrvable.subscribe(user => { if (user) window.location.replace('/'); });
  }

  public async submitLogin(f: NgForm) {
    const { email, password } = f.value;
    if (!email || !password)
      return;
    const loginStatus = await this.authService.login({
      email,
      password,
    });
    if (!loginStatus)
      return this.snackbarService.show({ message: 'Invalid credentials', type: 'error' });
  }

}
