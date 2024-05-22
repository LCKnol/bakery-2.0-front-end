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
import {EditdashboardComponent} from "../editdashboard/editdashboard.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatButtonModule,MatMenuModule,MatToolbarModule,MatIconModule,  RouterOutlet,
    RouterLink],
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent {
  @Input() dashboard!: DashboardDto;
  constructor(public dialog: MatDialog) {

  }

  openDialog(dashboard:DashboardDto) {
    const dialogRef = this.dialog.open(EditdashboardComponent, {
      data: {
        dashboard:dashboard
      }
    });
  }

}
