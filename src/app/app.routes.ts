import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ViewdashboardsComponent} from "./viewdashboards/viewdashboards.component";
import {authGuard} from "./guards/auth";
import {EditdashboardComponent} from "./editdashboard/editdashboard.component";
import {AddDashboardComponent} from "./add-dashboard/add-dashboard.component";
import {PimanagerComponent} from "./pimanager/pimanager.component"
import {InitPiComponent} from "./init-pi/init-pi.component";
import {CreateAccountComponent} from "./create-account/create-account.component";

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
    path: 'register',
    component: CreateAccountComponent,
    title: 'Register'
  },
  {
    path: 'dashboards',
    component: ViewdashboardsComponent,
    title: 'Dashboards',
  },
  {
    path: 'dashboards/edit/:dashboardId',
    component: EditdashboardComponent,
    title: 'Edit Dashboard'
  },
  {
    path: 'addDashboards',
    component: AddDashboardComponent,
    title: 'addDashboards'
  },
  {
    path: 'piManager',
    component: PimanagerComponent,
    title: 'piManager'
  },
  {
    path: 'init-pi',
    component: InitPiComponent,
    title: 'init-pi'
  }
];
