import {Injectable} from '@angular/core';
import {DashboardCollection} from '../dto/dashboardCollection';
import {firstValueFrom} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {GeneralService} from "./general.service";

@Injectable({
  providedIn: 'root'
})
 export class DashboardService {

  constructor(private generalService: GeneralService) {
  }

  public async getDashboards(): Promise<DashboardCollection> {

    const endpointUrl = 'http://localhost:8080/dashboards';
    return firstValueFrom(this.generalService.get(endpointUrl));
  }
}
