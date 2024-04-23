import {Team} from "./team";
import {Room} from "./room";

export interface User {
  firstname: string;
  lastname: string;
  teams: Team[];
  rooms: Room[];
}
