
import {GeneralService} from "./general.service";
import {User} from "../dto/user";
import {firstValueFrom} from "rxjs";
import {Url} from "./api-endpoints";
import {Injectable} from "@angular/core";
import {RoomCollection} from "../dto/roomCollection";
import {TeamInfo} from "../dto/team.info";
import {DashboardDto} from "../dto/dashboardDto";
import {RoomDto} from "../dto/roomDto";
import {Team} from "../dto/team";

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  constructor(private generalService: GeneralService) {
  }

  async getAllRooms(): Promise<RoomCollection> {
    return firstValueFrom(await this.generalService.get(Url.rooms));
  }

  async getAllRoomsAndTeams(): Promise<RoomCollection> {
    return firstValueFrom(await this.generalService.get(Url.rooms + '/roomandteam'));
  }

  public async deleteRoom(roomNo: String) {
    const endpointUrl = Url.rooms + '/' + roomNo;
    await firstValueFrom(await this.generalService.delete(endpointUrl));
  }
  public async addRoom(room: RoomDto) {
    const endpointUrl = Url.rooms;
    await firstValueFrom(await this.generalService.post(endpointUrl, room))
  }

  public async addTeamToRoom(roomNo: String, team: number) {
    const endpointUrl = Url.rooms + '/addToRoom' + '/' + roomNo + '/' + team;
    await firstValueFrom(await this.generalService.post(endpointUrl, roomNo));
  }

  public async removeTeamFromRoom(roomNo: String, team: number) {
    const endpointUrl = Url.rooms + '/removeFromRoom' + '/' + roomNo + '/' + team;
    await firstValueFrom(await this.generalService.delete(endpointUrl));
  }
}
