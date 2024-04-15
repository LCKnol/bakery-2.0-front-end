import { Component, Inject } from '@angular/core';
import {DashboardCardComponent} from '../dashboard-card/dashboard-card.component'
import {NavbarComponent} from '../navbar/navbar.component'
import {DashboardsDto} from '../dto/dashboardsDto'
import  {DashboardService} from  "../services/dashboard.service";
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-viewdashboards',
  standalone: true,
  imports: [DashboardCardComponent, NavbarComponent, CommonModule],
  templateUrl: './viewdashboards.component.html',
  styleUrl: './viewdashboards.component.css'
})
export class ViewdashboardsComponent {
  dashboards?: DashboardsDto;

  constructor(private  dashboardService: DashboardService)  {
     dashboardService.getDashboards().then((dashboard: DashboardsDto) => {
      this.dashboards = dashboard;
    });
  }
}
