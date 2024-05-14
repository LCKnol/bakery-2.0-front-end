import {Team} from "./team";
import {RoomDto} from "./roomDto";

export interface User {
  firstname: string;
  lastname: string;
  teams: Team[];
  rooms: RoomDto[];
}
