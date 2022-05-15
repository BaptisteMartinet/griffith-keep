import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoteService, NoteUpdateDialogService } from '../../services';
import type { UserT } from '../../services/auth.service';
import type { NoteT, NoteUpdateArgsT } from '../../services/note.service';

@Component({
  selector: 'app-note-update',
  templateUrl: './note-update.component.html',
  styleUrls: ['./note-update.component.scss']
})
export default class NoteUpdateComponent implements OnInit {
  public emails!: string;

  private _note!: NoteT;
  @Input()
  set note(value: NoteT) {
    this._note = { ...value };
    this.emails = this._note.assignee?.reduce((prev: string, curr: UserT) => (prev += `${curr.email};`), '');
  }
  get note(): NoteT {
    return this._note;
  }

  constructor(
    private noteUpdateDialogService: NoteUpdateDialogService,
    private noteService: NoteService,
  ) { }

  ngOnInit(): void { }

  autoResizeBody(ta: any) {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  async deleteNote() {
    await this.noteService.deleteNote(this._note._id);
    this.closeDialog();
  }

  async onSubmit(f: NgForm) {
    if (!f.value.body)
      return this.closeDialog();
    const args: NoteUpdateArgsT = {
      title: f.value.title || undefined,
      body: f.value.body,
      completionDate: f.value.completionDate || undefined,
      pinned: f.value.pinned || false,
      assigneeEmailsStr: f.value.assigneeEmailsStr || undefined,
    }
    f.reset();
    await this.noteService.updateNote(this._note._id, args);
    this.closeDialog();
  }

  closeDialog() {
    this.noteUpdateDialogService.closeDialog();
  }

}
