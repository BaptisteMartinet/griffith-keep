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
  public displayAssignee = false;

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

  toggleAssignee() {
    this.displayAssignee = !this.displayAssignee;
  }

  async onSubmit(f: NgForm) {
    this.oppened = false;
    if (!f.value.body)
      return;
    this.displayAssignee = false;

    const args: NoteCreateArgsT = {
      title: f.value.title || undefined,
      body: f.value.body,
      completionDate: f.value.completionDate || undefined,
      pinned: f.value.pinned || undefined,
      assigneeEmailsStr: f.value.assigneeEmailsStr || undefined,
    }
    f.reset();
    await this.noteService.createNote(args);
    this.snackbarService.show({ message: 'Note added', type: 'success' });
  }
}
