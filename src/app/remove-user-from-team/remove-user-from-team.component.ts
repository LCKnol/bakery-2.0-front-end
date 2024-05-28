import {Component, Inject} from '@angular/core';
import {Team} from "../dto/team";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {AssignDashboardComponent} from "../assign-dashboard/assign-dashboard.component";
import {DashboardService} from "../services/dashboard.service";
import {TeamService} from "../services/team.service";
import {TeamCollection} from "../dto/teamCollection";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-remove-user-from-team',
  standalone: true,
  imports: [
    MatButton,
    MatDialogContent,
    MatFormField,
    MatIcon,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './remove-user-from-team.component.html',
  styleUrl: './remove-user-from-team.component.css'
})
export class RemoveUserFromTeamComponent {

  userid: number | undefined
  teams: Team[] = []

  assignTeamForm: FormGroup = new FormGroup({
    team: new FormControl()
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<RemoveUserFromTeamComponent>, private dashboardService: DashboardService,private teamService: TeamService) {
    if (this.data) {
      this.userid = data.userid
      this.fetchTeams()
    }
  }

  submitAssignTeamForm() {
    this.teamService.removeUserFromTeam(this.userid!!,this.assignTeamForm.value.team).then(r =>
      this.dialogRef.close(true))
  }

  fetchTeams() {
    this.teamService.getTeamsFromUser(this.userid!!).then((teamCollection: TeamCollection) => {
      this.teams = teamCollection.teamCollection
    });
  }
}
