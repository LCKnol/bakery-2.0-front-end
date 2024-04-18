import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from "rxjs";
import {Token} from "../dto/token";
import {LoginRequest} from "../dto/loginRequest";
import { CookieService } from 'ngx-cookie-service';
import {GeneralService} from "./general.service";
import {Url} from "./api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private cookieService: CookieService, private generalService: GeneralService) {
  }

  public async login(loginRequst : LoginRequest): Promise<Token> {

    const endpointUrl = Url.authentication;
    return firstValueFrom(this.generalService.post(endpointUrl, loginRequst));
  }

  public setToken(token: Token) : void {
    this.cookieService.set('token', token.token)
    console.log(this.cookieService.get('token'));
  }

  public async logout(): Promise<void> {
    const endpointUrl = Url.authentication;
    return firstValueFrom(await this.generalService.delete(endpointUrl));
  }
}
