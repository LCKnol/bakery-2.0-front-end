import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {GeneralService} from "../services/general.service";

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
    ReactiveFormsModule,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger
  ],
  templateUrl: './assign-team.component.html',
  styleUrl: './assign-team.component.css'
})
export class AssignTeamComponent {

  userid: number | undefined
  teams: Team[] = []
  userTeams: Team[] = []
  teamFormControl = new FormControl(null, [Validators.required])
  filteredOptions: Observable<Team[]> = new Observable<Team[]>();

  assignTeamForm: FormGroup = new FormGroup({
    team: this.teamFormControl
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<AssignDashboardComponent>, private teamService: TeamService, private generalService: GeneralService) {
    if (this.data) {
      this.userid = data.userid
      this.userTeams = data.teams
      this.fetchTeams()
    }
  }


  submitAssignTeamForm() {
    this.teamService.assignUserToTeam(this.userid!!,this.assignTeamForm.value.team.id).then(r => {
      this.dialogRef.close(true); 
      this.generalService.showSnackbar("Succesfully added team to user", "OK")
    }).catch(_ => {
      this.generalService.showSnackbar("Error while assigning team", "OK")
      this.dialogRef.close()
    })
  }

  fetchTeams() {
    this.teamService.getAllTeams().then((teamCollection: TeamCollection) => {
      this.teams = teamCollection.teamCollection.filter(item => !this.userTeams.some(user => user.id === item.id));
      this.filteredOptions = this.teamFormControl.valueChanges
        .pipe(
          startWith<string | null>(''),
          map(value => this._filter(value!!))
        );
    });
  }

  displayFn(team?: any): string {
    return team ? team.name : undefined;
  }

  private _filter(value: string): Team[] {
    const filterValue = value.toLowerCase();

    return this.teams.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
