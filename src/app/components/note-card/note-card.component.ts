import { Component, Input, OnInit } from '@angular/core';
import { NoteUpdateDialogService } from '../../services';
import { NoteT } from '../../services/note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export default class NoteCardComponent implements OnInit {
  @Input() note!: NoteT;

  constructor(private noteUpdateDialogService: NoteUpdateDialogService) { }

  ngOnInit(): void { }

  onClick() {
    this.noteUpdateDialogService.showDialog(this.note);
  }

}
