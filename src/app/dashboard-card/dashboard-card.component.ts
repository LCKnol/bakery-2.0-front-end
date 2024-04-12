import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {DashboardDto} from '../dto/dashboard-dto'

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatButtonModule,MatMenuModule,MatToolbarModule,MatIconModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css',
})
export class DashboardCardComponent {
  //@Input() dashboard!: DashboardDto
  constructor() {

  }

}
