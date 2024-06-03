
import {GeneralService} from "./general.service";
import {firstValueFrom} from "rxjs";
import {Url} from "./api-endpoints";
import {Injectable} from "@angular/core";
import {TeamCollection} from "../dto/teamCollection";
import {User} from "../dto/user";
import {TeamInfo} from "../dto/team.info";
import {RoomCollection} from "../dto/roomCollection";
import {UserCollection} from "../dto/userCollection";
import {TeamInfoCollection} from "../dto/TeamInfoCollection";

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  constructor(private generalService: GeneralService) {
  }

  async getTeamsFromCurrentUser(): Promise<TeamCollection> {
    return firstValueFrom(await this.generalService.get(Url.teams));
  }
  async getTeamsFromUser(user:number): Promise<TeamCollection> {
    const endpointUrl = Url.teams +"/user/"+user
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }

  async getAllTeams(): Promise<TeamCollection> {
    const endpointUrl = Url.teams +"/all"
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }

  async getTeamsNotInRoom(roomNo: String | undefined) : Promise<TeamCollection> {
    return firstValueFrom(await this.generalService.get(Url.teams + '/notinroom' + '/' + roomNo));
  }
  async assignUserToTeam(user:number,team:number){
    const endpointUrl = Url.teams +"/assignToTeam/"+user+"/"+team
    return firstValueFrom(await this.generalService.post(endpointUrl,user))
  }

  async removeUserFromTeam(user:number,team:number){
    const endpointUrl = Url.teams +"/removeFromTeam/"+user+"/"+team
    return firstValueFrom(await this.generalService.delete(endpointUrl))
  }

  async addTeam(team:TeamInfo) {
    const endpointUrl = Url.teams
    return firstValueFrom(await this.generalService.post(endpointUrl,team))
  }

  async getRoomsInTeam(teamId: number | undefined): Promise<RoomCollection> {
    const endpointUrl = Url.rooms + "/team/" + teamId;
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }

  async getUsersInTeam(teamId: number): Promise<UserCollection> {
    const endpointUrl = Url.teams + "/users/" + teamId;
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }
  async deleteTeam(teamId: number): Promise<void> {
    const endpointUrl = Url.teams + "/" + teamId;
    await firstValueFrom(await this.generalService.delete(endpointUrl));
  }
  async getAllTeamsInfo(): Promise<TeamInfoCollection> {
    const endpointUrl = Url.teams + "/allInfo"
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }
}
