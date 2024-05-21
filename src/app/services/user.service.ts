import {Injectable} from "@angular/core";
import {GeneralService} from "./general.service";
import {UserInfo} from "../dto/userInfo";
import {UserCollection} from "../dto/userCollection";
import {firstValueFrom} from "rxjs";
import {Url} from "./api-endpoints";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private generalService: GeneralService) {
  }

  async getAllUsers(): Promise<UserCollection> {
    var endpointUrl = Url.user +"/all"
    return firstValueFrom(await this.generalService.get(endpointUrl))
  }
}
