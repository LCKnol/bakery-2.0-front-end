import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PiCollection} from "../dto/pi-collection";
import {Token} from "../dto/token";
import {firstValueFrom} from "rxjs";
import {User} from "../dto/user";
import {GeneralService} from "./general.service";

@Injectable({
  providedIn: 'root'
})
export class HomeScreenService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private generalService: GeneralService) {
  }

  async getUser(): Promise<User> {
    return firstValueFrom(await this.generalService.get("http://localhost:8080/user"));
  }

  async getPis(): Promise<PiCollection> {
    return firstValueFrom(await this.generalService.get("http://localhost:8080/user"));
  }
}
