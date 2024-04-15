import {Team} from "./team";
import {Room} from "./room";

export interface User {
  name: string;
  teams: Team[];
  rooms: Room[];
}
