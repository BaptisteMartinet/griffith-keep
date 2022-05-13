import { Component, Input, OnInit } from '@angular/core';
import { NoteT } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export default class NoteCardComponent implements OnInit {
  @Input() note!: NoteT;

  constructor() { }

  ngOnInit(): void { }

}
