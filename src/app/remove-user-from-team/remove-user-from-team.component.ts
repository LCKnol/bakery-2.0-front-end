import {Component, Inject} from '@angular/core';
import {Team} from "../dto/team";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {AssignDashboardComponent} from "../assign-dashboard/assign-dashboard.component";
import {DashboardService} from "../services/dashboard.service";
import {TeamService} from "../services/team.service";
import {TeamCollection} from "../dto/teamCollection";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {AsyncPipe, NgForOf} from "@angular/common";
import {GeneralService} from "../services/general.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatInput} from "@angular/material/input";

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
    ReactiveFormsModule,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput
  ],
  templateUrl: './remove-user-from-team.component.html',
  styleUrl: './remove-user-from-team.component.css'
})
export class RemoveUserFromTeamComponent {

  userid: number | undefined
  teams: Team[] = []
  teamFormControl = new FormControl(null, [Validators.required])
  filteredOptions: Observable<Team[]> = new Observable<Team[]>();

  assignTeamForm: FormGroup = new FormGroup({
    team: this.teamFormControl
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private generalService:GeneralService, private dialogRef: MatDialogRef<RemoveUserFromTeamComponent>, private dashboardService: DashboardService,private teamService: TeamService) {
    if (this.data) {
      this.userid = data.userid
      this.teams = data.userTeams
      this.fetchTeams()
    }
  }

  submitRemoveTeamForm() {
    this.teamService.removeUserFromTeam(this.userid!!,this.assignTeamForm.value.team.id).then(r => {
      this.dialogRef.close(true)
      this.generalService.showSnackbar("Removed team from user", "OK")}).catch(_ => {
      this.generalService.showSnackbar("Error while removing team from user", 'OK')
      this.dialogRef.close()
    })
  }

  fetchTeams() {
    this.filteredOptions = this.teamFormControl.valueChanges
      .pipe(
        startWith<string | null>(''),
        map(value => this._filter(value!!))
      );
  }

  displayFn(team?: any): string {
    return team ? team.name : undefined;
  }

  private _filter(value: string): Team[] {
    const filterValue = value.toLowerCase();

    return this.teams.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
