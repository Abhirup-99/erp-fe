import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  isLogin = true;
  signUpForm = new FormGroup({
    email: this.email,
    password: this.password
  });
  constructor() { }
  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorPasswordMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return (!this.password.valid) ? 'Should have min 8 length' : 'valid';
  }
  onSubmit(): void{
    console.log(this.signUpForm);
  }
  ngOnInit(): void {
  }

}
