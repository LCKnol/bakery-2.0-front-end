import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {PiCardComponent} from "../pi-card/pi-card.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Token} from "../dto/token";
import {NgForOf, NgIf} from "@angular/common";
import {PiCollection} from "../dto/pi-collection";
import {User} from "../dto/user";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatCardTitle,
    MatCardSubtitle,
    MatDivider,
    PiCardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private headers: HttpHeaders;
  private token: Token = {
    "token": "1234-1234-1234"
  };
  piCollection: PiCollection = {
    pis: []
  };
  user: User | undefined;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<User>("http://localhost:8080/user", this.token, {headers: this.headers}).subscribe(res => this.user = res);
    this.http.post<PiCollection>("http://localhost:8080/pis", this.token, {headers: this.headers}).subscribe(res => this.piCollection = res);
  }

}
