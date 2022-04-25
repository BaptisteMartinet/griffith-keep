import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss']
})
export default class NoteCreateComponent implements OnInit {
  public closed = true;

  constructor() { }

  ngOnInit(): void { }

  autoResizeBody(ta: any) {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }

  onBodyFocus() {
    this.closed = false;
  }

  onSubmit(f: NgForm) {
    // TODO create note and clear form
    console.log(f.value);
    this.closed = true;
  }
}
