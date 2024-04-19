import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ViewdashboardsComponent} from "./viewdashboards/viewdashboards.component";
import {authGuard} from "./guards/auth";
import {AddDashboardComponent} from "./add-dashboard/add-dashboard.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
    title: 'Login'
  },
  {
    path: 'dashboards',
    component: ViewdashboardsComponent,
    title: 'Dashboards'
  },
  {
    path: 'addDashboards',
    component: AddDashboardComponent,
    title: 'addDashboards'
  },
];
