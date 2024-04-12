import {Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatButton, MatFabButton, MatMiniFabButton } from "@angular/material/button";
import { LoginRequest } from "../dto/loginRequest";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AppConstants} from "../app.constants";
import {Token} from "../dto/token";

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
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
  this.url = AppConstants.API_LOGIN_URL;
  this.headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  }

  submitLoginForm() {
    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    };

    console.log(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '');

    this.http.post<Token>("http://localhost:8080/login", loginRequest, { headers: this.headers })
      .subscribe(data => this.handleResponse(data))
  }

  handleResponse(data: Token) {
    console.log(data.token)
  }
}
