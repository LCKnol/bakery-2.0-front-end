import {Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatButton, MatFabButton, MatMiniFabButton } from "@angular/material/button";
import { LoginRequest } from "../dto/loginRequest";
import {AppConstants} from "../app.constants";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatButton,
    MatMiniFabButton,
    MatFabButton,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  private url: string;

  constructor(private loginService : LoginService, private router: Router, private snackbar: MatSnackBar) {
  this.url = AppConstants.API_LOGIN_URL;
  }

  submitLoginForm() : void {
    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.loginService.login(loginRequest)
      .then(token => {
        this.loginService.setToken(token);
        this.router.navigate(['/']).catch(_ => {console.log('no homepage found');});
      })
      .catch(_ => {this.snackbar.open('Invalid login credentails', 'ok', {
        verticalPosition: 'bottom'
      });})
  }
}
