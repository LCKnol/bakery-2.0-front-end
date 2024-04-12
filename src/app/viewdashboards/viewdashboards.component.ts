import { Component } from '@angular/core';
import {DashboardCardComponent} from '../dashboard-card/dashboard-card.component'
import {NavbarComponent} from '../navbar/navbar.component'
import {DashboardDto} from '../dto/dashboard-dto'


@Component({
  selector: 'app-viewdashboards',
  standalone: true,
  imports: [DashboardCardComponent, NavbarComponent],
  templateUrl: './viewdashboards.component.html',
  styleUrl: './viewdashboards.component.css'
})
export class ViewdashboardsComponent {
constructor() {
}
}
