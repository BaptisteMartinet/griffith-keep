import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserT } from '../services/auth.service';

export interface NoteT {
  _id: string,
  author: UserT,
  assignee: Array<UserT>,
  title: string,
  body: string,
  pinned: boolean,
  completionDate: Date,
}

export interface NoteCreateArgsT {
  assigneeEmailsStr?: string,
  title?: string,
  body: string,
  pinned?: boolean,
  completionDate?: Date,
}

export interface NoteUpdateArgsT {
  assigneeEmailsStr?: string,
  title?: string,
  body?: string,
  pinned?: boolean,
  completionDate?: Date,
}

/**
 * @description This service handles everything note related
 * It exposes four methods: loadNotes, createNote, updateNote and deleteNote.
 */
@Injectable({
  providedIn: 'root'
})
export default class NoteService {
  private notesSubject = new Subject<Array<NoteT>>();
  public notesObservable = this.notesSubject.asObservable();

  private notesLoadingSubject = new Subject<boolean>();
  public notesLoadingObservable = this.notesLoadingSubject.asObservable();

  constructor() { }

  async loadNotes(searchTerm?: string) {
    this.notesLoadingSubject.next(true);
    const notesRes = await fetch(`${environment.API_URI}/note${searchTerm ? `?searchTerm=${searchTerm}` : ''}`, { credentials: 'include' });
    if (!notesRes.ok)
      return;
    const notes: Array<NoteT> = await notesRes.json();
    this.notesSubject.next(notes);
    this.notesLoadingSubject.next(false);
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
    await this.loadNotes(); // Service reloads all the notes when a new one is created (bad practice)
  }

  async updateNote(id: string, args: NoteUpdateArgsT) {
    const res = await fetch(`${environment.API_URI}/note/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    if (!res.ok)
      return;
    await this.loadNotes();
  }

  async deleteNote(noteId: string) {
    const res = await fetch(`${environment.API_URI}/note/${noteId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok)
      return;
    await this.loadNotes();
  }

}
