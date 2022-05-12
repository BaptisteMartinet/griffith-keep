import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export default class NoteCardComponent implements OnInit {
  @Input() title!: string;
  @Input() body!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
