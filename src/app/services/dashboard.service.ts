import { Injectable } from '@angular/core';
import {DashboardsDto} from '../dto/DashboardsDto';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
 export class DashboardService {

  constructor(private httpClient: HttpClient) {
  }

  public async getDashboards(): Promise<DashboardsDto> {

    const endpointUrl = 'http://localhost:8080/dashboards';
    const params = new HttpParams().set('token', "test");

    try {
      const data : DashboardsDto = await this.httpClient.get<DashboardsDto>(endpointUrl, {params: params}).toPromise() as DashboardsDto;
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };
};

