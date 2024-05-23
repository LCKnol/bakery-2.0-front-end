
import {GeneralService} from "./general.service";
import {firstValueFrom} from "rxjs";
import {Url} from "./api-endpoints";
import {Injectable} from "@angular/core";
import {TeamCollection} from "../dto/teamCollection";

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  constructor(private generalService: GeneralService) {
  }

  async getAllTeams(): Promise<TeamCollection> {
    return firstValueFrom(await this.generalService.get(Url.teams));
  }

  async getTeamsNotInRoom(roomNo: String | undefined) : Promise<TeamCollection> {
    return firstValueFrom(await this.generalService.get(Url.teams + '/notinroom' + '/' + roomNo));
  }
}
