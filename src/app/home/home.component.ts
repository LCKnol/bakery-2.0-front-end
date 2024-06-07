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
import {LoginResponse} from "../dto/loginResponse";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PiCollection} from "../dto/pi-collection";
import {UserInfo} from "../dto/userInfo";
import {PiService} from "../services/pi.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatList} from "@angular/material/list";

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
    NgIf,
    NgOptimizedImage,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatList
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: UserInfo | undefined;

  constructor(private piService: PiService) {
    this.piService.getUser().then(res => this.user = res)
  }

}
