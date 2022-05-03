import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    public authService: AuthService
  ) {
    titleService.setTitle('Griffith Keep - Register');
  }

  ngOnInit(): void {
    this.authService.userObesrvable.subscribe(user => { if (user) this.router.navigate([ '/' ]); });
  }

  async submitRegister(f: NgForm) {
    const { firstName, lastName, email, password } = f.value;
    if (!firstName || !lastName || !email || !password)
      return;
    const registerStatus = await this.authService.register({
      firstName,
      lastName,
      email,
      password,
    });
    if (registerStatus)
      this.router.navigate([ 'login' ]);
  }
}
