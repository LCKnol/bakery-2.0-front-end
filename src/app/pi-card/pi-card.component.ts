import {Component, Input} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {Pi} from "../dto/pi";

@Component({
  selector: 'app-pi-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatDivider,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './pi-card.component.html',
  styleUrl: './pi-card.component.css'
})
export class PiCardComponent {
  @Input() pi!: Pi;
}
