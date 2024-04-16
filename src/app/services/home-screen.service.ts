import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PiCollection} from "../dto/pi-collection";
import {Token} from "../dto/token";
import {firstValueFrom} from "rxjs";
import {User} from "../dto/user";

@Injectable({
  providedIn: 'root'
})
export class HomeScreenService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  public getUser(token: Token): Promise<User> {
    return firstValueFrom(this.http.post<User>("http://localhost:8080/user", token, {headers: this.headers}))
  }

  public getPis(token: Token): Promise<PiCollection> {
    return firstValueFrom(this.http.post<PiCollection>("http://localhost:8080/pis", token, {headers: this.headers}));
  }
}
