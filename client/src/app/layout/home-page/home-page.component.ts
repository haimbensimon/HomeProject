import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/account-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  registerMode: boolean = false;
constructor(public accountService: AccountServiceService){}
  ngOnInit(): void {}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegistration(event: boolean) {
    this.registerMode = event;
  }
}
