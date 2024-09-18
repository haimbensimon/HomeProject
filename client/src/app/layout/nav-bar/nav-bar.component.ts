import { registerUser } from './../../account/models/registerModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountServiceService } from 'src/app/account-service.service';
import { loginUser } from 'src/app/account/models/loginModel';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loginForm!: FormGroup;
  LoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl(),
      password: new FormControl(),
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    let model: loginUser = {
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value,
    };

    console.log(model);

    this.accountService.login(model).subscribe(
      (result) => {
        console.log(result);
        this.LoggedIn = true;
      },
      (err) => console.log(err.error)
    );
  }

  logOut() {
    this.accountService.logOut();
    this.LoggedIn = false;
  }
}
