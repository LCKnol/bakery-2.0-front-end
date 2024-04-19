import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatFabButton, MatMiniFabButton } from "@angular/material/button";
import {Router, RouterModule} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {LoginService} from "../services/login.service";
import {CookieService} from "ngx-cookie-service";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatButton, RouterModule, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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
}
