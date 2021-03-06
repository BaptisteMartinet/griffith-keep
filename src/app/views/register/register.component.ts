import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AuthService, SnackbarService } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router,
    public authService: AuthService,
    private snackbarService: SnackbarService,
  ) {
    this.titleService.setTitle('Griffith Keep - Register');
    this.authService.userObesrvable.subscribe(user => { if (user) window.location.replace('/'); });
  }

  ngOnInit(): void { }

  async submitRegister(f: NgForm) {
    const { firstName, lastName, email, password } = f.value;
    if (!firstName || !lastName || !email || !password)
      return this.snackbarService.show({ message: 'You must fill in all the fields', type: 'warning' }, 'long');
    const registerStatus = await this.authService.register({
      firstName,
      lastName,
      email,
      password,
    });
    if (!registerStatus)
      return this.snackbarService.show({ message: 'Something went wrong', type: 'error' }, 'long');
    this.router.navigate(['login']);
  }
}
