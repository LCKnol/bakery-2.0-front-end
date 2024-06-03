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
import {RoomsComponent} from "./rooms/rooms.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {GoogleOauthComponent} from "./google-oauth/google-oauth.component";
import {UserManagerComponent} from "./user-manager/user-manager.component";
import {ViewpisComponent} from "./viewpis/viewpis.component";
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
    path: 'register',
    component: CreateAccountComponent,
    canActivate: [authGuard],
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
    path: 'rooms',
    component: RoomsComponent,
    title: 'rooms'
  },
  {
    path: 'teamManager',  // Add the route for TeamManagerComponent
    component: TeamManagerComponent,
    title: 'TeamManager'
  },
  {
    path: 'pis',
    component: ViewpisComponent,
    title: 'Pis'
  },
  {
    path: 'google-oauth',
    component: GoogleOauthComponent,
    canActivate: [authGuard],
    title: 'Google OAuth'
  }
];
