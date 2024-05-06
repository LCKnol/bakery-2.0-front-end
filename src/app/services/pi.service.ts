import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PiCollection} from "../dto/pi-collection";
import {Token} from "../dto/token";
import {firstValueFrom} from "rxjs";
import {User} from "../dto/user";
import {GeneralService} from "./general.service";
import {Url} from "./api-endpoints";
import {PiRequestCollection} from "../dto/piRequestCollection";
import {Pi} from "../dto/pi";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PiService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private generalService: GeneralService, private router: Router) {
  }


  async getUser(): Promise<User> {
    return firstValueFrom(await this.generalService.get(Url.user));
  }

  async getPis(): Promise<PiCollection> {
    return firstValueFrom(await this.generalService.get(Url.pi));
  }
  async getAllPis(): Promise<PiCollection> {
    return firstValueFrom(await this.generalService.get(Url.pi+"/all"));
  }

  async getPiRequests(): Promise<PiRequestCollection> {
    return firstValueFrom(await this.generalService.get(Url.pi+"/requests"));
  }


  async initPi(pi: Pi) {
    await this.generalService.post(Url.pi + "/init", pi)
    this.router.navigate(["/"])
    this.generalService.showSnackbar("Pi initialized", "OK")
  }
}
