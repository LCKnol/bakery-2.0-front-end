
import {GeneralService} from "./general.service";
import {firstValueFrom} from "rxjs";
import {Url} from "./api-endpoints";
import {Injectable} from "@angular/core";
import {RoomCollection} from "../dto/roomCollection";
import {TeamInfo} from "../dto/team.info";
import {RoomDto} from "../dto/roomDto";

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  constructor(private generalService: GeneralService) {
  }

  async getAllRooms(): Promise<RoomCollection> {
    return firstValueFrom(await this.generalService.get(Url.rooms));
  }

  // async addRoom(room:RoomDto): Promise<void> {
  //   const endpointUrl = Url.teams
  //   return firstValueFrom(await this.generalService.post(endpointUrl,room))
  // }
}
