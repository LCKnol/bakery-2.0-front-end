import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    title: 'Home'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login'
  }
];

export default routes;
