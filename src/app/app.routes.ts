import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {ViewdashboardsComponent} from "./viewdashboards/viewdashboards.component";
import {authGuard} from "./guards/auth";
import {EditdashboardComponent} from "./editdashboard/editdashboard.component";
import {AddDashboardComponent} from "./add-dashboard/add-dashboard.component";
import {EditpiComponent} from "./editpi/editpi.component";
import {PimanagerComponent} from "./pimanager/pimanager.component"
import {InitPiComponent} from "./init-pi/init-pi.component";
import {UserManagerComponent} from "./user-manager/user-manager.component";
import {TeamManagerComponent} from "./team-manager/team-manager.component";

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
    path : 'piManager/edit/:piId',
    component: EditpiComponent,
    title: 'Edit Pi' ,
  },

  {
    path: 'userManager',
    component: UserManagerComponent,
    title: 'userManager'
  },
  {
    path: 'init-pi',
    component: InitPiComponent,
    title: 'init-pi'
  },
  {
    path: 'teamManager',  // Add the route for TeamManagerComponent
    component: TeamManagerComponent,
    title: 'TeamManager'
  }
];
