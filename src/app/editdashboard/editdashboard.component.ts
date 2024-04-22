import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DashboardDto} from "../dto/dashboardDto";
import {DashboardService} from "../services/dashboard.service";
import {GeneralService} from "../services/general.service";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {executeKarmaBuilder} from "@angular-devkit/build-angular";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-editdashboard',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    ReactiveFormsModule,
    MatMiniFabButton
  ],
  templateUrl: './editdashboard.component.html',
  styleUrl: './editdashboard.component.css'
})
export class EditdashboardComponent {
  dashboard: DashboardDto | undefined
  private dashboardId?: number

  dashboardEditForm: FormGroup = new FormGroup({
    name: new FormControl(),
    dashboardUrl: new FormControl(),
    imageUrl: new FormControl()
  })

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private router: Router, private generalService: GeneralService) {
    this.route.params.subscribe(params => {
      this.dashboardId = params['dashboardId'];
    });
    dashboardService.getDashboard(this.dashboardId!)
      .then((dashboard: DashboardDto) => {this.dashboard = dashboard;})
      .catch(_ => {
        generalService.showSnackbar("No dashboard available", "OK")
        router.navigate(['/dashboards'])
      })
  }

  async submitEditDashboardForm() {
    var editDashboard: DashboardDto = {
      id: this.dashboard?.id!!,
      name: this.dashboardEditForm.value.name ?? this.dashboard?.name,
      dashboardUrl: this.dashboardEditForm.value.dashboardUrl ?? this.dashboard?.dashboardUrl,
      imageUrl: this.dashboardEditForm.value.imageUrl ?? this.dashboard?.imageUrl,
      userId: -1,
    }

    await this.dashboardService.editDashboard(editDashboard)
      .then(_ => {
        this.generalService.showSnackbar("Dashboard succesfully updated", "OK", {duration: 3000})
      }).catch(_ => {this.generalService.showSnackbar("Error while updating dashboard", "OK")})

    this.router.navigate(["/dashboards"])
  }

  async deleteDashboard() {
    await this.dashboardService.deleteDashboard(this.dashboardId!!)
      .then(_ => {
        this.generalService.showSnackbar("Dashboard succesfully deleted", "OK", {duration: 3000})
      }).catch(_ => {this.generalService.showSnackbar("Error while deleting dashboard", "OK")})

    this.router.navigate(["/dashboards"])
  }
}

