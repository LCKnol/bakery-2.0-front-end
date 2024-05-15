import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DashboardDto} from "../dto/dashboardDto";
import {DashboardService} from "../services/dashboard.service";
import {GeneralService} from "../services/general.service";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {executeKarmaBuilder} from "@angular-devkit/build-angular";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {TeamCollection} from "../dto/teamCollection";
import {TeamService} from "../services/team.service";
import {Team} from "../dto/team";

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
    MatMiniFabButton,
    MatOption,
    MatSelect,
    NgForOf
  ],
  templateUrl: './editdashboard.component.html',
  styleUrl: './editdashboard.component.css'
})
export class EditdashboardComponent {
  dashboard: DashboardDto | undefined
  private dashboardId?: number
  selected: String = "test"

  dashboardEditForm: FormGroup = new FormGroup({
    name: new FormControl(),
    dashboardUrl: new FormControl(),
    imageUrl: new FormControl(),
    team: new FormControl()
  })

  teams: Team[] = []

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private teamService: TeamService, private router: Router, private generalService: GeneralService) {
    this.route.params.subscribe(params => {
      this.dashboardId = params['dashboardId'];
    });

    this.fetchTeams()
    this.fetchDashboard()
  }

  fetchTeams() {
    // Make an HTTP GET request to your backend API to fetch room numbers
    this.teamService.getAllTeams().then((teamCollection: TeamCollection) => {
      this.teams = teamCollection.teamCollection
    })
    .catch(_ => {
      this.generalService.showSnackbar("No dashboard available", "OK")
      this.router.navigate(['/dashboards'])
    });
  }

  fetchDashboard() {
    this.dashboardService.getDashboard(this.dashboardId!)
    .then((dashboard: DashboardDto) => {
      this.dashboard = dashboard;
      // this.selected = dashboard.team
      this.setFormValues()
    })
    .catch(e => {
      console.log(e)
      this.generalService.showSnackbar("No dashboard available", "OK")
      this.router.navigate(['/dashboards'])
    })
  }

  setFormValues() {
    if (this.dashboard) {
      const selectedTeam = this.dashboard.team || null;
      this.dashboardEditForm.controls['name'].setValue(this.dashboard.dashboardName);
      this.dashboardEditForm.controls['dashboardUrl'].setValue(this.dashboard.dashboardUrl);
    }
  }

  async submitEditDashboardForm() {
    var editDashboard: DashboardDto = {
      id: this.dashboard?.id!!,
      dashboardName: this.dashboardEditForm.value.name ?? this.dashboard?.dashboardName,
      dashboardUrl: this.dashboardEditForm.value.dashboardUrl ?? this.dashboard?.dashboardUrl,
      imageUrl: this.dashboardEditForm.value.imageUrl ?? this.dashboard?.imageUrl,
      team: this.dashboardEditForm.value.team ?? this.dashboard?.team,
      hasAccess: this.dashboard?.hasAccess ?? false,
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

