import {Injectable} from "@angular/core";
import {GeneralService} from "./general.service";
import {UserCollection} from "../dto/userCollection";
import {firstValueFrom} from "rxjs";
import {Url} from "./api-endpoints";
import {User} from "../dto/user";


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private generalService: GeneralService) {
  }

  async getAllUsers(): Promise<UserCollection> {
    const endpointUrl = Url.user +"/all"
    return firstValueFrom(await this.generalService.get(endpointUrl))
  }

 async deleteUser(id: number) {
    const endpointUrl = Url.user +"/"+id
    return firstValueFrom(await this.generalService.delete(endpointUrl))
  }

  async addUser(user:User) {
    const endpointUrl = Url.user
    return firstValueFrom(await this.generalService.post(endpointUrl,user))
  }

}
