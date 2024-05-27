import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, firstValueFrom, map, Observable, of} from "rxjs";
import {LoginResponse} from "../dto/loginResponse";
import {GeneralService} from "./general.service";
import {Url} from "./api-endpoints";
import {GoogleToken} from "../dto/googleToken";
import {NewGoogleUserDto} from "../dto/NewGoogleUserDto";


@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private googleUserTokenKey = 'googleUserToken';
  private clientId = '459811137064-cfhur48n8304qbm0t55hg9c06rtbl9l0.apps.googleusercontent.com'; // Replace with your Google Client ID

  constructor(private http: HttpClient, private generalService: GeneralService) { }


  public async authenticate(googleToken: GoogleToken): Promise<LoginResponse>{
    const endpointUrl = Url.authentication+"/google";
    return firstValueFrom(await this.generalService.post(endpointUrl, googleToken));
  }

  public async addGoogleUser(newGoogleUser: NewGoogleUserDto) {
    const endpointUrl = Url.authentication+"/google/register";
    return firstValueFrom(await this.generalService.post(endpointUrl, newGoogleUser));
  }

  // Get token from sessionStorage
  public getGoogleUserToken(): GoogleToken {
    return {
      jwtToken: sessionStorage.getItem(this.googleUserTokenKey)
    }
  }

  public async verifyGoogleToken() {
    const endpointUrl = Url.authentication+"/google/verify-token";
    await this.generalService.post(endpointUrl, this.getGoogleUserToken());
  }

}
