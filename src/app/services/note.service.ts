import { Injectable } from '@angular/core';
import { UserT } from './auth.service';

interface NoteT {
  author: UserT,
  assigned: Array<UserT>,
  title: string,
  body: string,
  pinned: boolean,
  completionDate: Date,
}

@Injectable({
  providedIn: 'root'
})
export default class NoteService {
  public notes: Array<NoteT> = [];

  constructor() { }

  async loadNotes() { }

  async createNote() { }

  async updateNote() { }

  async deleteNote() { }

}
