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
import {Token} from "../dto/token";
import {NgForOf, NgIf} from "@angular/common";
import {PiCollection} from "../dto/pi-collection";
import {User} from "../dto/user";
import {HomeScreenService} from "../services/home-screen.service";

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
  private token: Token = {
    "token": "1234-1234-1234"
  };
  piCollection: PiCollection = {
    pis: []
  };
  user: User | undefined;

  constructor(private homeScreenService: HomeScreenService) {
    this.homeScreenService.getUser(this.token).then(res => this.user = res)
    this.homeScreenService.getPis(this.token).then(res => this.piCollection = res);
  }
}
