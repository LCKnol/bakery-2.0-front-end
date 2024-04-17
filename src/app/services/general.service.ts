import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  post(url: string, body: any, params? : HttpParams): Observable<any> {
    const headers = this.setHeaders()
    return this.http.post<any>(url, body, {headers: headers, params: params});
  }

  get(url: string, params? : HttpParams): Observable<any> {
    const headers = this.setHeaders()
    return this.http.get<any>(url, {headers: headers, params: params});
  }

  delete(url: string, params? : HttpParams): Observable<any> {
    const headers = this.setHeaders()
    return this.http.delete<any>(url, {headers: headers, params: params});
  }

  put(url: string, body: any, params? : HttpParams): Observable<any> {
    const headers = this.setHeaders()
    return this.http.put<any>(url, body, {headers: headers, params: params});
  }

  private setHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.cookieService.get('token')
    });
  }

}
