import {Injectable} from "@angular/core";
import {catchError, firstValueFrom, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {

  }

  post(url: string, body: any, params? : HttpParams): Observable<any> {
    const headers = this.setHeaders()
    return this.http.post<any>(url, body, {headers: headers, params: params})
      .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // If 401 received, redirect to /login
          console.log("error flagged! FINALLY WA N KUTZOOI JONGE")
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      }))
  }

  async get(url: string, params? : HttpParams): Promise<any> {
    const headers = this.setHeaders()
    return this.http.get<any>(url, {headers: headers, params: params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // If 401 received, redirect to /login
            console.log("error flagged! FINALLY WA N KUTZOOI JONGE")
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        }))
  }

  delete(url: string, params? : HttpParams): Observable<any> {
    const headers = this.setHeaders()
    return this.http.delete<any>(url, {headers: headers, params: params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // If 401 received, redirect to /login
            console.log("error flagged! FINALLY WA N KUTZOOI JONGE")
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        }))
  }

  put(url: string, body: any, params? : HttpParams): Observable<any> {
    const headers = this.setHeaders()
    return this.http.put<any>(url, body, {headers: headers, params: params})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // If 401 received, redirect to /login
            console.log("error flagged! FINALLY WA N KUTZOOI JONGE")
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        }))
  }

  private setHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.cookieService.get('token')
    });
  }

}
