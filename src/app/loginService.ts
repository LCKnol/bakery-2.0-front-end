import { Injectable } from '@angular/core';
import { Token } from './token';
import {HttpClient, HttpHandler} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url;
  // private http;
  // private handler: HttpHandler;

  constructor() {
    this.url = 'http://localhost:8080/login';
  }

  // async login(email: string, password: string) : Promise<Token | undefined> {
  //   const body = {email: email, password: password};
  //   var result =
  // }

}
