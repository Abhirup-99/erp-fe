import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private authService: AuthService,
    private router: Router,private snackBar: MatSnackBar) { }
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
  login(email: string,password: string): void{
    this.authService.login(email,password).then((result)=>{
      this.snackBar.open('Redirecting', 'Dismiss', {
        duration: 100,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
  signup(email: string,password: string): void{
    this.authService.signup(email,password).then(()=>{
      this.snackBar.open('Redirecting', 'Dismiss', {
        duration: 100,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.router.navigate(['create']);
    });
  }
  onSubmit(): void{
    console.log(this.signUpForm);
    this.snackBar.open('Authenticating', 'Dismiss', {
      duration: 500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    if(this.isLogin){
      this.login(this.signUpForm.value.email, this.signUpForm.value.password);
    }else{
      this.signup(this.signUpForm.value.email, this.signUpForm.value.password);
    }

  }
  ngOnInit(): void {
  }

}
