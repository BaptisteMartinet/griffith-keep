import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export default class UserCardComponent implements OnInit {
  @Input() firstName!: string;
  @Input() lastName!: string;
  public initials!: string;

  ngOnInit(): void {
    this.initials = this.firstName.charAt(0) + this.lastName.charAt(0);
  }
}
