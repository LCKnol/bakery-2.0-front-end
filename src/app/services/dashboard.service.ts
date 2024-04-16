import {Injectable} from '@angular/core';
import {DashboardsDto} from '../dto/dashboardsDto';
import {HttpClient, HttpParams} from '@angular/common/http';
import {firstValueFrom} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
 export class DashboardService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public async getDashboards(): Promise<DashboardsDto> {

    const endpointUrl = 'http://localhost:8080/dashboards';

    const params = new HttpParams().set('token', this.cookieService.get('token'));

    try {
      return await firstValueFrom(this.httpClient.get<DashboardsDto>(endpointUrl, {params: params}));
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

