import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PiCollection} from "../dto/pi-collection";
import {LoginResponse} from "../dto/loginResponse";
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
    await firstValueFrom(await this.generalService.post(Url.pi + "/init", pi))
  }

  async declinePi(macAddress: string): Promise<void> {
    await firstValueFrom(await this.generalService.delete(Url.pi + "/init/" + macAddress));
  }

  async assignDashboard(pi: Pi) {
    await firstValueFrom(await this.generalService.post(Url.pi + "/setdashboard",pi));
  }

  async pingPi(pi: number): Promise<void> {
    await firstValueFrom(await this.generalService.get(Url.pi + "/ping/" + pi))
  }
}
