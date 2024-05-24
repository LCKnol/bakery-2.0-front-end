import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from "rxjs";
import {LoginResponse} from "../dto/loginResponse";
import {LoginRequest} from "../dto/loginRequest";
import { CookieService } from 'ngx-cookie-service';
import {GeneralService} from "./general.service";
import {Url} from "./api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private cookieService: CookieService, private generalService: GeneralService, private http: HttpClient) {
  }

  public async login(loginRequst : LoginRequest): Promise<LoginResponse> {

    const endpointUrl = Url.authentication;
    return firstValueFrom(await this.generalService.post(endpointUrl, loginRequst));
  }

  public setCookies(loginResponse: LoginResponse) : void {
    this.cookieService.set('token', loginResponse.token)
    this.cookieService.set('admin', loginResponse.isAdmin.toString())
  }

  public async logout(): Promise<void> {
    const endpointUrl = Url.authentication;
    const x : Promise<void> = firstValueFrom(await this.generalService.delete(endpointUrl));
    this.cookieService.delete("token")
    sessionStorage.clear()
    return x
  }


}
