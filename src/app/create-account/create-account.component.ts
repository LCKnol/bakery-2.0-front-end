import {Component} from "@angular/core";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {GoogleAuthService} from "../services/google-auth.service";
import {GeneralService} from "../services/general.service";
import {User} from "../dto/user";
import {NewGoogleUserDto} from "../dto/NewGoogleUserDto";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {LoginService} from "../services/login.service";
import {LoginRequest} from "../dto/loginRequest";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatButton,
    MatMiniFabButton,
    MatFabButton,
    MatFormField,
    MatCardTitle,
    MatCardHeader,
    MatInput,
    MatIcon,
    MatError,
    NgIf,
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  RegisterForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    googleEmail: new FormControl(''),
    googleFirstName: new FormControl(''),
    googleLastName: new FormControl(''),

  }, { validators: this.passwordMatchValidator() });
  googleUser: any;
  googleEmail: string | undefined;
  googleFirstName: string | undefined;
  googleLastName: string | undefined;


  constructor(private googleAuthService: GoogleAuthService,
              private generalService: GeneralService,
              private router: Router,
              private loginService: LoginService
  ) {
    this.googleAuthService.verifyGoogleToken().catch()

    this.loadGoogleUser();
  }


  submitRegisterForm(): void {

    if (this.RegisterForm.invalid) {
      return;
    }
    const newUser: User = {
      id: -1,
      firstName: this.googleFirstName ?? '',
      lastName: this.googleLastName ?? '',
      email: this.googleEmail ?? '',
      password: this.RegisterForm.value.password,
      isAdmin: false,
      teams: []
    }

    const newGoogleUser: NewGoogleUserDto = {
      jwtToken: this.googleAuthService.getGoogleUserToken().jwtToken ?? '',
      userDto: newUser
    }

    this.googleAuthService.addGoogleUser(newGoogleUser).then(_ => {
      this.generalService.showSnackbar("User successfully registered", "OK")
      const loginRequest: LoginRequest = {
        email: this.googleEmail!!,
        password: this.RegisterForm.value.password
      }
      this.loginService.login(loginRequest).then(r => {
        this.loginService.setCookies(r)
        this.router.navigate(['/'])
      })
    }).catch(_ => {
      this.generalService.showSnackbar("Error while registering user", "OK");
    })
  }


  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordsMismatch: true };
      }
      return null;
    };
  }

  loadGoogleUser(): void {
    const googleUserData = sessionStorage.getItem('googleUser');
    if (googleUserData) {
      this.googleUser = JSON.parse(googleUserData)
      this.googleEmail = this.googleUser.email
      this.googleFirstName = this.googleUser.given_name
      this.googleLastName = this.googleUser.family_name
    } else {
      this.router.navigate(["/login"]);
    }
  }


}
