import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService, NoteService } from 'src/app/services';
import type { NoteT } from 'src/app/services/note.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export default class HomepageComponent implements OnInit {
  public pinnedNotes: Array<NoteT> = [];
  public notes: Array<NoteT> = [];
  public expiredNotes: Array<NoteT> = [];

  constructor(
    private titleService: Title,
    private router: Router,
    private authService: AuthService,
    private noteService: NoteService,
  ) {
    this.titleService.setTitle('Griffith Keep');
  }

  ngOnInit(): void {
    this.authService.userObesrvable.subscribe(user => { if (!user) this.router.navigate(['login']); });
    this.noteService.notesObservable.subscribe(notes => {
      this.pinnedNotes = [];
      this.notes = [];
      this.expiredNotes = [];
      notes.forEach(note => {
        if (note.completionDate && new Date(note.completionDate).getTime() - new Date().getTime() < 0)
          this.expiredNotes.push(note);
        else if (note.pinned)
          this.pinnedNotes.push(note);
        else
          this.notes.push(note);
      });
    });
    this.noteService.loadNotes();
  }

  noteTrackBy(index: number, note: NoteT) {
    return note._id;
  }

}
