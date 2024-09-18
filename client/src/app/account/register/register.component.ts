import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountServiceService } from 'src/app/account-service.service';
import { registerUser } from '../models/registerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountServiceService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: new FormControl(),
      password: new FormControl(),
    });
  }
  submit() {
    if (!this.registerForm.valid) {
      return;
    }
    let model: registerUser = {
      userName: this.registerForm.get('userName')?.value,
      password: this.registerForm.get('password')?.value,
    };

    console.log(model);

    this.accountService.register(model).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => console.log(err.error)
    );
  }
}
