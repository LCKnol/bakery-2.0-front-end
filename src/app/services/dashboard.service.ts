import {Injectable} from '@angular/core';
import {DashboardCollection} from '../dto/dashboardCollection';
import {firstValueFrom} from "rxjs";
import {GeneralService} from "./general.service";
import {Url} from "./api-endpoints";

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
}
