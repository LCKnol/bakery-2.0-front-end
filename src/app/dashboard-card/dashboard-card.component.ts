import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {DashboardDto} from '../dto/dashboardDto'
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatButtonModule,MatMenuModule,MatToolbarModule,MatIconModule,  RouterOutlet,
    RouterLink],
  styleUrl: './dashboard-card.component.css',
  template :`<mat-card class="dashboard-card">
    <mat-card-header>
      <div mat-card-avatar class="example-header-image"></div>
      <mat-card-title>{{dashboard.name}} </mat-card-title>
      <mat-card-subtitle></mat-card-subtitle>
    </mat-card-header>
    <img mat-card-image src="../../assets/defaultDashboardImage.jpg" alt="dashboardPhoto">
    <mat-card-content>
      <p>
      </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-flat-button color="primary" >View dashboard</button>
    </mat-card-actions>
  </mat-card>`
})
export class DashboardCardComponent {
  @Input() dashboard!: DashboardDto;
  constructor() {

  }

}
