import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NoteT } from '../services/note.service';

@Injectable({
  providedIn: 'root'
})
export default class NoteUpdateDialogService {
  private noteSubject = new Subject<NoteT | null>();
  public noteObservanle: Observable<NoteT | null> = this.noteSubject.asObservable();

  constructor() { }

  public showDialog(note: NoteT) {
    this.noteSubject.next(note);
  }

  public closeDialog() {
    this.noteSubject.next(null);
  }
}
