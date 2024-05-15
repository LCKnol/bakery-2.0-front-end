import {Team} from "./team";

export interface DashboardDto {
  id:  number;
  dashboardUrl: string;
  dashboardName: string;
  imageUrl: string;
  team: Team;
  hasAccess: Boolean;
}
