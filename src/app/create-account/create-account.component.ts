import {Component} from "@angular/core";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

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
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  RegisterForm: FormGroup = new FormGroup({
    password: new FormControl('')
  });
  private googleUser: any;

  ngOnInit(): void {
    this.loadGoogleUser();
  }

  loadGoogleUser(): void {
    const googleUserData = sessionStorage.getItem('googleUser');
    if (googleUserData) {
      this.googleUser = JSON.parse(googleUserData);
      console.log('Google User:', this.googleUser);
    } else {
      console.error('No Google User data found in sessionStorage');
    }
  }


}
