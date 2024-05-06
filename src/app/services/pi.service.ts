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
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GeneralService } from './general.service';
import { Url } from './api-endpoints';
import { Pi } from '../dto/pi';
import { PiCollection } from '../dto/pi-collection';
import {Room} from "../dto/room";

@Injectable({
  providedIn: 'root'
})
export class PiService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private generalService: GeneralService) {}

  public async getPis(): Promise<PiCollection> {
    const endpointUrl = Url.pi; // Make sure 'Url.pis' is defined
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }

  public async addPi(pi: Pi) {
    const endpointUrl = Url.pi;
    await firstValueFrom(await this.generalService.post(endpointUrl, pi));

  async getUser(): Promise<User> {
    return firstValueFrom(await this.generalService.get(Url.user));
  }

  public async getPi(piId: number): Promise<Pi> {
    const endpointUrl = Url.pi + '/' +piId;
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }

  async getPiRequests(): Promise<PiRequestCollection> {
    return firstValueFrom(await this.generalService.get(Url.pi+"/requests"));
  }


  public async editPi(pi: Pi) {
    const endpointUrl = Url.pi;
    await firstValueFrom(await this.generalService.put(endpointUrl, pi));
  async initPi(pi: Pi) {
    await firstValueFrom(await this.generalService.post(Url.pi + "/init", pi))
  }

  public async deletePi(piId: number) {
    const endpointUrl = `${Url.pi}/${piId}`;
    await firstValueFrom(await this.generalService.delete(endpointUrl));
  async declinePi(macAddress: string): Promise<void> {
    await firstValueFrom(await this.generalService.delete(Url.pi + "/init/" + macAddress));
  }



}
