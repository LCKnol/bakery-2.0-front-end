import { Component, inject } from '@angular/core';
import {DashboardCardComponent} from '../dashboard-card/dashboard-card.component'
import {NavbarComponent} from '../navbar/navbar.component'
import {DashboardsDto} from '../dto/DashboardsDto'
import  {DashboardService} from  "../services/dashboard.service";


@Component({
  selector: 'app-viewdashboards',
  standalone: true,
  imports: [DashboardCardComponent, NavbarComponent],
  templateUrl: './viewdashboards.component.html',
  styleUrl: './viewdashboards.component.css'
})
export class ViewdashboardsComponent {
  item: DashboardsDto;


  constructor(private  dashboardService: DashboardService)  {
   this.item = dashboardService.getDashboards()
  }
}
