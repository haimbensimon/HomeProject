import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { registerUser } from './../../account/models/registerModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountServiceService } from 'src/app/account-service.service';
import { loginUser } from 'src/app/account/models/loginModel';
import { User } from 'src/app/account/models/User';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public accountService: AccountServiceService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl(),
      password: new FormControl(),
    });
  }

  submit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    let model: loginUser = {
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.accountService.login(model).subscribe(
      (result) => {
        this.loginForm.get('userName')?.patchValue(null);
        this.loginForm.get('password')?.patchValue(null);

        window.location.reload();
      },
      (err) => console.log(err.error)
    );
  }

  logOut() {
    this.accountService.logOut();
    this.router.navigate(['/home']);
  }
}
