import {Team} from "./team";

export interface DashboardDto {
  id:  number;
  dashboardUrl: string;
  dashboardName: string;
  team: Team;
  hasAccess: Boolean;
}
