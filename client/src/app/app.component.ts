import { User } from './account/models/User';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from './product-service.service';
import { AccountServiceService } from './account-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  item: string = 'user';
  constructor(
    private productService: ProductServiceService,
    private accountService: AccountServiceService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
    this.productService.getAllProduct().subscribe(
      (result) => {
        console.log(result);
      },
      (error) => console.log(error)
    );
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
