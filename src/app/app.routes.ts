import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ViewdashboardsComponent} from "./viewdashboards/viewdashboards.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'dashboards',
    component: ViewdashboardsComponent,
    title: 'dashboards'
  },
];
