import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServiceService } from 'src/app/account-service.service';
import { registerUser } from '../models/registerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  @Output() cancelRgister = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,private router:Router,
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


    this.accountService.register(model).subscribe(
      (result) => {
       
        this.router.navigateByUrl('/home')

      },
      (err) => console.log(err.error)
    );
  }

  cancel() {
    this.cancelRgister.emit(false);
  }
}
