import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, NoteService } from '../../services';
import type { UserT } from '../../services/auth.service';

const MinRefreshRate = 2000;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export default class NavbarComponent implements OnInit {
  public user: UserT | null = null;
  public notesLoading: boolean = false;
  private lastReloadTime: number = Date.now();

  constructor(private authService: AuthService, private noteService: NoteService) { }

  ngOnInit(): void {
    this.authService.userObesrvable.subscribe(u => { this.user = u });
    this.noteService.notesLoadingObservable.subscribe(state => { this.notesLoading = state; });
  }

  onSubmit(f: NgForm) {
    this.noteService.loadNotes(f.value.search);
  }

  onReloadNotesClick() {
    if (this.notesLoading || Date.now() - this.lastReloadTime <= MinRefreshRate)
      return;
    this.lastReloadTime = Date.now();
    this.noteService.loadNotes(); // This is an async call
  }

  async onLogoutClick() {
    const logoutRes = await this.authService.logout();
    if (logoutRes)
      window.location.replace('/');
  }
}
