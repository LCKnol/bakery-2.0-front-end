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
  constructor(private generalService: GeneralService) {}

  public async getPis(): Promise<PiCollection> {
    const endpointUrl = Url.pi; // Make sure 'Url.pis' is defined
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }

  public async addPi(pi: Pi) {
    const endpointUrl = Url.pi;
    await firstValueFrom(await this.generalService.post(endpointUrl, pi));
  }

  public async getPi(piId: number): Promise<Pi> {
    const endpointUrl = Url.pi + '/' +piId;
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }



  public async editPi(pi: Pi) {
    const endpointUrl = Url.pi;
    await firstValueFrom(await this.generalService.put(endpointUrl, pi));
  }

  public async deletePi(piId: number) {
    const endpointUrl = `${Url.pi}/${piId}`;
    await firstValueFrom(await this.generalService.delete(endpointUrl));
  }



}
