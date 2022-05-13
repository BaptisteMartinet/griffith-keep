import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, NoteService } from 'src/app/services';
import type { UserT } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export default class NavbarComponent implements OnInit {
  public user: UserT | null = null;

  constructor(private authService: AuthService, private noteService: NoteService) { }

  ngOnInit(): void {
      this.authService.userObesrvable.subscribe(u => { this.user = u });
  }

  onSubmit(f: NgForm) {
    const searchTerm = f.value.search;
    if (!searchTerm)
      return;
    this.noteService.loadNotes(searchTerm);
  }
}
