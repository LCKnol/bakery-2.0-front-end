import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from "rxjs";
import {Token} from "../dto/token";
import {LoginRequest} from "../dto/loginRequest";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public async login(loginRequst : LoginRequest): Promise<Token> {

    const endpointUrl = 'http://localhost:8080/login';

    try {
      return await firstValueFrom(this.httpClient.post<Token>(endpointUrl, loginRequst));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public setToken(token: Token) : void {
    this.cookieService.set('token', token.token)
  }
}
