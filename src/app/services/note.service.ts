import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserT } from './auth.service';

export interface NoteT {
  author: UserT,
  assigned: Array<UserT>,
  title: string,
  body: string,
  pinned: boolean,
  completionDate: Date,
}

export interface NoteCreateArgsT {
  assigned?: Array<string>,
  title?: string,
  body: string,
  pinned?: boolean,
  completionDate?: Date,
}

export interface NoteUpdateArgsT {
  assigned?: Array<string>,
  title?: string,
  body?: string,
  pinned?: boolean,
  completionDate?: Date,
}

@Injectable({
  providedIn: 'root'
})
export default class NoteService {
  public notesSubject = new Subject<Array<NoteT>>();
  public notesObservable = this.notesSubject.asObservable();

  constructor() { }

  async loadNotes() {
    const notesRes = await fetch(`${environment.API_URI}/note`, { credentials: 'include' });
    if (!notesRes.ok)
      return;
    const notes: Array<NoteT> = await notesRes.json();
    this.notesSubject.next(notes);
  }

  async createNote(args: NoteCreateArgsT) {
    const noteRes = await fetch(`${environment.API_URI}/note`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    if (!noteRes.ok)
      return;
    await this.loadNotes(); // Service realoads all the notes when a new one is created (bad practice)
  }

  async updateNote(id: string, args: NoteUpdateArgsT) {
    const res = await fetch(`${environment.API_URI}/note/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
  }

  async deleteNote(noteId: string) {
    const res = await fetch(`${environment.API_URI}/note/${noteId}`, {
      method: 'DEL',
      credentials: 'include',
    });
    if (!res.ok)
      return;
    await this.loadNotes();
  }

}
