import {Team} from "./team";
import {RoomDto} from "./roomDto";

export interface UserInfo {
  firstname: string;
  lastname: string;
  teams: Team[];
  rooms: RoomDto[];
  isAdmin: boolean;
}
