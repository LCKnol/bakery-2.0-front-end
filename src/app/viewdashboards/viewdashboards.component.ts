import { Component, Inject } from '@angular/core';
import {DashboardCardComponent} from '../dashboard-card/dashboard-card.component'
import {NavbarComponent} from '../navbar/navbar.component'
import {DashboardCollection} from '../dto/dashboardCollection'
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
  dashboards?: DashboardCollection;

  constructor(private  dashboardService: DashboardService)  {
     dashboardService.getDashboards().then((dashboard: DashboardCollection) => {
      this.dashboards = dashboard;
    });
  }
}
