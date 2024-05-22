import {Team} from "./team";

export interface User {
   id: Number;
   firstName: String;
   lastName: String;
   email: String;
   password: String;
   isAdmin: Boolean;
   teams: Team[]
}
