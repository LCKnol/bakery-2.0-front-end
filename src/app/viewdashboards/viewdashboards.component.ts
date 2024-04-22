import { Component, Inject } from '@angular/core';
import {DashboardCardComponent} from '../dashboard-card/dashboard-card.component'
import {NavbarComponent} from '../navbar/navbar.component'
import {DashboardCollection} from '../dto/dashboardCollection'
import  {DashboardService} from  "../services/dashboard.service";
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DashboardDto} from "../dto/dashboardDto";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {AddDashboardComponent} from "../add-dashboard/add-dashboard.component";
import {MatCard} from "@angular/material/card";


@Component({
  selector: 'app-viewdashboards',
  standalone: true,
  imports: [DashboardCardComponent, NavbarComponent, CommonModule, MatButton, MatToolbar, NgOptimizedImage, RouterLink, MatFormField, MatInput, MatIcon, MatCard],
  templateUrl: './viewdashboards.component.html',
  styleUrl: './viewdashboards.component.css'
})
export class ViewdashboardsComponent {
  dashboards?: DashboardDto[] = [];
  filteredDashboards?: DashboardDto[] = [];

  constructor(private  dashboardService: DashboardService,public dialog: MatDialog)  {
     dashboardService.getDashboards().then((dashboard: DashboardCollection) => {
      this.dashboards = dashboard.dashboards;
      this.filteredDashboards = dashboard.dashboards
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredDashboards = this.dashboards;
      return;
    }

    this.filteredDashboards = this.dashboards?.filter(
      dashboard => dashboard?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

}
