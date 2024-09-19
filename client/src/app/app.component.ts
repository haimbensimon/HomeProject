import { User } from './account/models/User';
import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from './account-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  item: string = 'user';
  constructor(private accountService: AccountServiceService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let user: User | null = null;
    var userToParse = localStorage.getItem(this.item);
    if (userToParse) {
      user = JSON.parse(userToParse);
    }

    this.accountService.setCurrentUser(user);
  }
}
