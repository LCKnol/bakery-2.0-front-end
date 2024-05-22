import {Team} from "./team";

export interface User {
   id: Number;
   firstname: String;
   lastname: String;
   email: String;
   password: String;
   isAdmin: Boolean;
   teams: Team[]
}
