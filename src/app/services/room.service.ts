
import {GeneralService} from "./general.service";
import {firstValueFrom} from "rxjs";
import {Url} from "./api-endpoints";
import {Injectable} from "@angular/core";
import {RoomCollection} from "../dto/roomCollection";
import {DashboardDto} from "../dto/dashboardDto";
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

  public async deleteRoom(roomNo: String) {
    const endpointUrl = Url.rooms + '/' + roomNo;
    await firstValueFrom(await this.generalService.delete(endpointUrl));
  }
  public async addRoom(room: RoomDto) {
    const endpointUrl = Url.rooms;
    await firstValueFrom(await this.generalService.post(endpointUrl, room))
  }
}
