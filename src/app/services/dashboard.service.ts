import {Injectable} from '@angular/core';
import {DashboardCollection} from '../dto/dashboardCollection';
import {firstValueFrom} from "rxjs";
import {GeneralService} from "./general.service";
import {Url} from "./api-endpoints";
import {DashboardDto} from "../dto/dashboardDto";

@Injectable({
  providedIn: 'root'
})
 export class DashboardService {

  constructor(private generalService: GeneralService) {
  }

  public async getDashboards(): Promise<DashboardCollection> {

    const endpointUrl = Url.dashboards;
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }
  public async addDashboard(dashboard :DashboardDto) {
    const endpointUrl = Url.dashboards;
    await firstValueFrom(await this.generalService.post(endpointUrl, dashboard))
  }

  public async getDashboard(dashboardId : number): Promise<DashboardDto> {
    const endpointUrl = Url.dashboards + '/' + dashboardId;
    return firstValueFrom(await this.generalService.get(endpointUrl));
  }

  public async editDashboard(dashboard: DashboardDto) {
    const endpointUrl = Url.dashboards;
    await firstValueFrom(await this.generalService.put(endpointUrl, dashboard))
  }

  public async deleteDashboard(dashboardId: number) {
    const endpointUrl = Url.dashboards + '/' + dashboardId;
    await firstValueFrom(await this.generalService.delete(endpointUrl));
  }
}
