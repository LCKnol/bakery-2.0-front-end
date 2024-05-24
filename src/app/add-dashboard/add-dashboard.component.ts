import {Component, Inject} from '@angular/core';
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
import {GeneralService} from "../services/general.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {Team} from "../dto/team";
import {TeamService} from "../services/team.service";
import {RoomCollection} from "../dto/roomCollection";
import {TeamCollection} from "../dto/teamCollection";
import {NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";

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
    MatSelect,
    MatOption,
    NgForOf,
    MatDialogContent,
  ],
  templateUrl: './add-dashboard.component.html',
  styleUrl: './add-dashboard.component.css'
})
export class AddDashboardComponent {
  addDashboardForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    dashboardUrl: new FormControl(''),
    dashboardRefresh: new FormControl(''),
    team: new FormControl('')
  });

  teams: Team[] = []

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<AddDashboardComponent>, private dashboardService: DashboardService, private teamService: TeamService, private router: Router, private generalService: GeneralService) {
    this.fetchTeams()
  }

  fetchTeams() {
    // Make an HTTP GET request to your backend API to fetch room numbers
    this.teamService.getTeamsFromCurrentUser().then((teamCollection: TeamCollection) => {
      this.teams = teamCollection.teamCollection
    });
  }

  submitAddDashboardForm(): void {
    const dashboardDto: DashboardDto = {
      team: this.addDashboardForm.value.team ?? null,
      id: -1,
      dashboardName: this.addDashboardForm.value.name ?? '',
      dashboardUrl: this.addDashboardForm.value.dashboardUrl ?? '',
      dashboardRefresh: this.addDashboardForm.value.dashboardRefresh ?? 300,
      hasAccess: false
    };
    this.dashboardService.addDashboard(dashboardDto)
      .then(token => {
        this.router.navigate(['/dashboards']).catch(_ => {
          console.log('no page found');
        });
        this.generalService.showSnackbar("Dashboard added successfully", "ok", {})
        this.dialogRef.close()
      })
      .catch(_ => {
        this.generalService.showSnackbar("Dashboard added failed", "ok", {});
      })
  }

}
