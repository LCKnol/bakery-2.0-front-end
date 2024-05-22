import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DashboardDto} from "../dto/dashboardDto";
import {Pi} from "../dto/pi";
import {DashboardService} from "../services/dashboard.service";
import {PiService} from "../services/pi.service";
import {DashboardCollection} from "../dto/dashboardCollection";
import {AssignDashboardComponent} from "../assign-dashboard/assign-dashboard.component";
import {UserService} from "../services/user.service";
import {Team} from "../dto/team";
import {TeamCollection} from "../dto/teamCollection";
import {TeamService} from "../services/team.service";

@Component({
  selector: 'app-assign-team',
  standalone: true,
    imports: [
        MatButton,
        MatDialogContent,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './assign-team.component.html',
  styleUrl: './assign-team.component.css'
})
export class AssignTeamComponent {

  userid: number | undefined
  teams: Team[] = []

  assignTeamForm: FormGroup = new FormGroup({
    team: new FormControl()
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<AssignDashboardComponent>, private dashboardService: DashboardService,private teamService: TeamService) {
    if (this.data) {
      this.userid = data.userid
      this.fetchTeams()
    }
  }


  submitAssignTeamForm() {
    this.teamService.assignUserToTeam(this.userid!!,this.assignTeamForm.value.team).then(r =>
      this.dialogRef.close(true))
  }

  fetchTeams() {
    this.teamService.getAllTeams().then((teamCollection: TeamCollection) => {
      this.teams = teamCollection.teamCollection
    });
  }
}
