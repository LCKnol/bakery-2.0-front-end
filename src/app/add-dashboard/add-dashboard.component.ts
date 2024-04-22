import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {LoginRequest} from "../dto/loginRequest";
import {DashboardDto} from "../dto/dashboardDto";
import {DashboardService} from "../services/dashboard.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-add-dashboard',
  standalone: true,

  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatLabel,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatIcon,
  ],
  templateUrl: './add-dashboard.component.html',
  styleUrl: './add-dashboard.component.css'
})
export class AddDashboardComponent {
  addDashboardForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    dashboardUrl: new FormControl(''),
    image: new FormControl('')
  });

  constructor(private dashboardService: DashboardService,private router: Router, private snackbar: MatSnackBar) {

  }
  submitAddDashboardForm() : void {
    const dashboardDto: DashboardDto = {
      userId: -1,
      id: -1,
      name: this.addDashboardForm.value.name ?? '',
      dashboardUrl: this.addDashboardForm.value.dashboardUrl ?? '',
      imageUrl: 'testurl'
    };
    this.dashboardService.addDashboard(dashboardDto)
      .then(token => {
        this.router.navigate(['/dashboards']).catch(_ => {console.log('no page found');});
      })
      .catch(_ => {this.snackbar.open('Adding dashboard failed', 'ok', {
        verticalPosition: 'bottom'
      });})
  }

}
