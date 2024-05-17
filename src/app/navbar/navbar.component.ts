import {Component} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatFabButton, MatMiniFabButton } from "@angular/material/button";
import {Router, RouterModule, Routes} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {LoginService} from "../services/login.service";
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatButton, RouterModule, NgOptimizedImage, NgIf, MatTabNav, MatTabLink, MatTabNavPanel, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent {
  links = [['Home', '/'],['Dashboard','dashboards'],['Admin','admin']];
  activeLink = this.links[0];
  adminLinks = [["PI's", 'piManager'],['Users','users'], ['Teams','teams']];
  activeAdminLink : String[] = this.adminLinks[0];
  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService, private snackbar: MatSnackBar) {
  }


  logout(): void {
    this.loginService.logout()
      .then(() => {
        this.cookieService.delete("token")
        this.router.navigate(['/login'])
      })
      .catch(_ => {this.snackbar.open('An error occurred while logging out', 'ok', {
        verticalPosition: 'bottom'
      });});
  }

  loggedIn(): boolean {
    return this.cookieService.get('token') != ''
  }

  isAdmin(): boolean {
    var admin = this.cookieService.get('admin')
    return admin === "true";
  }
}
