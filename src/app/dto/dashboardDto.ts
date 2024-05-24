import {Team} from "./team";

export interface DashboardDto {
  id: number;
  dashboardUrl: string;
  dashboardName: string;
  dashboardRefresh: number;
  team: Team;
  hasAccess: Boolean;
}
