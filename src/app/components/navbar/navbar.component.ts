import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export default class NavbarComponent {

  constructor(public authService: AuthService) { }

  onSubmit(f: NgForm) {
    console.log(f.value.search);
    // TODO search cards
  }
}
