import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor() { }

  onSubmit(f: NgForm) {
    console.log(f.value.search);
    // TODO search cards
  }
}
