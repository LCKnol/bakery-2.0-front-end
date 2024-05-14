
import {GeneralService} from "./general.service";
import {User} from "../dto/user";
import {firstValueFrom} from "rxjs";
import {Url} from "./api-endpoints";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  constructor(private generalService: GeneralService) {
  }

  async getAllRooms(): Promise<User> {
    return firstValueFrom(await this.generalService.get(Url.rooms));
  }
}
