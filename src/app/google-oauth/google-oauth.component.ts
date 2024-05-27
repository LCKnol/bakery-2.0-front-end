import {Component} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Router} from "@angular/router";
import {GoogleAuthService} from "../services/google-auth.service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-google-oauth',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  template: '<div style="display: flex; justify-content: center; align-items: center; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"> <mat-spinner></mat-spinner></div>',
})
export class GoogleOauthComponent {

  constructor(
    private router: Router,
    private googleAuthService: GoogleAuthService,
    private loginService: LoginService
  ) {
    this.handleGoogleOAuth()

  }

  handleGoogleOAuth() {
    const jwtToken = this.googleAuthService.getGoogleUserToken()
    if (jwtToken.jwtToken) {
      this.googleAuthService.authenticate(jwtToken).then(response => {
        if (!response.token) {
          this.router.navigate(["/register"])
          return
        }
        this.loginService.setCookies(response)
        this.router.navigate(['/'])
      })

    }
  }

}
