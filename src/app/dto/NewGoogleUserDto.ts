import {User} from "./user";

export class NewGoogleUserDto {
  jwtToken: string | undefined
  userDto: User | undefined
}
