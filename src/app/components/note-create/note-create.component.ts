import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoteService, SnackbarService } from 'src/app/services';
import type { NoteCreateArgsT } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss']
})
export default class NoteCreateComponent implements OnInit {
  public oppened = false;

  constructor(
    public noteService: NoteService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void { }

  autoResizeBody(ta: any) {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  onBodyFocus() {
    this.oppened = true;
  }

  async onSubmit(f: NgForm) {
    this.oppened = false;
    if (!f.value.body)
      return;
    await this.noteService.createNote(f.value as NoteCreateArgsT);
    f.reset();
    this.snackbarService.show({ message: 'Note added', type: 'success' }, 3000);
  }
}
