import { Component, OnInit } from '@angular/core';
import { NoteUpdateDialogService } from '../../services';
import { NoteT } from '../../services/note.service';

@Component({
  selector: 'app-note-update-dialog',
  templateUrl: './note-update-dialog.component.html',
  styleUrls: ['./note-update-dialog.component.scss']
})
export default class NoteUpdateDialogComponent implements OnInit {
  public note: NoteT | null = null;

  constructor(private noteUpdateDialogService: NoteUpdateDialogService) { }

  ngOnInit(): void {
    this.noteUpdateDialogService.noteObservanle.subscribe(val => { this.note = val; });
  }

}
