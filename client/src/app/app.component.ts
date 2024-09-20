import { User } from './account/models/User';
import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from './account-service.service';
import { PresenceService } from './presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  item: string = 'user';
  constructor(
    private accountService: AccountServiceService,
    private presenceHub: PresenceService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let user: User = {
      userName: '',
      token: '',
      roles: [],
    };
    var userToParse = localStorage.getItem(this.item);
    if (userToParse) {
      user = JSON.parse(userToParse);
      this.accountService.setCurrentUser(user);
      this.presenceHub.createConnectionHub(user);
      
    }
  }
}
