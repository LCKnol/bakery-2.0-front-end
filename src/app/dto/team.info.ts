import {User} from "./user";
import {RoomDto} from "./roomDto";

export interface TeamInfo {
  id: number,
  name: string,
  members: User[],
  rooms: RoomDto[]
}
