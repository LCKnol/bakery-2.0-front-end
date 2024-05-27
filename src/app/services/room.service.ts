
import {GeneralService} from "./general.service";
import {firstValueFrom} from "rxjs";
import {Url} from "./api-endpoints";
import {Injectable} from "@angular/core";
import {RoomCollection} from "../dto/roomCollection";

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  constructor(private generalService: GeneralService) {
  }

  async getAllRooms(): Promise<RoomCollection> {
    return firstValueFrom(await this.generalService.get(Url.rooms));
  }
}
