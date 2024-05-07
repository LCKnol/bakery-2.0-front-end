import {Component} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import { MatButton, MatFabButton, MatMiniFabButton } from "@angular/material/button";
import { LoginRequest } from "../dto/loginRequest";
import {AppConstants} from "../app.constants";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatButton,
    MatMiniFabButton,
    MatFabButton,
    MatFormField,
    MatCardTitle,
    MatCardHeader,
    MatInput,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private loginService : LoginService, private router: Router, private snackbar: MatSnackBar) {
  }

  submitLoginForm() : void {
    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    this.loginService.login(loginRequest)
      .then(loginResponse => {
        this.loginService.setCookies(loginResponse);
        this.router.navigate(['/']).catch(_ => {console.log('no homepage found');});
      })
      .catch(_ => {this.snackbar.open('Invalid login credentials', 'ok', {
        verticalPosition: 'bottom'
      });})
  }
}
