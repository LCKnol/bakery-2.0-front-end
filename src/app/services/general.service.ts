import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private snackbar: MatSnackBar) {

  }

  async post(url: string, body: any, params? : HttpParams): Promise<any> {
    const headers = this.setHeaders()
    return this.http.post<any>(url, body, {headers: headers, params: params})
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleHttpError(error)))
  }

  async get(url: string, params? : HttpParams): Promise<any> {
    const headers = this.setHeaders()
    return this.http.get<any>(url, {headers: headers, params: params})
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleHttpError(error)))
  }

  async delete(url: string, params? : HttpParams): Promise<any> {
    const headers = this.setHeaders()
    console.log(url)
    return this.http.delete<any>(url, {headers: headers, params: params})
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleHttpError(error)))
  }

  async put(url: string, body: any, params? : HttpParams): Promise<any> {
    const headers = this.setHeaders()
    return this.http.put<any>(url, body, {headers: headers, params: params})
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleHttpError(error)))
  }

  showSnackbar(message: string, action: string, config?: MatSnackBarConfig) {
    this.snackbar.open(message, action, config)
  }

  private setHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.cookieService.get('token')
    });
  }

  private handleHttpError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // If 401 received, redirect to /login
      this.cookieService.delete('token')
      this.router.navigate(['/login']);
    }else if (error.status === 403)
      this.router.navigate(['/']);
    return throwError(() => error);
  }

}
