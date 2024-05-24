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
import {AsyncPipe, NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

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
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
  ],
  templateUrl: './add-dashboard.component.html',
  styleUrl: './add-dashboard.component.css'
})
export class AddDashboardComponent {
  filteredOptions: Observable<Team[]> = new Observable<Team[]>();
  teamFormControl = new FormControl()

  addDashboardForm: FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    dashboardUrl: new FormControl(null,[Validators.required]),
    team: this.teamFormControl
  });

  teams: Team[] = []

  constructor(private dialogRef: MatDialogRef<AddDashboardComponent>,private dashboardService: DashboardService, private teamService: TeamService, private router: Router, private generalService: GeneralService) {
    this.fetchTeams()
  }

  fetchTeams() {
    this.teamService.getTeamsFromCurrentUser().then((teamCollection: TeamCollection) => {
      this.teams = teamCollection.teamCollection
      this.filteredOptions = this.teamFormControl.valueChanges
        .pipe(
          startWith<string | null>(''),
          map(value => this._filter(value!!))
        );
    })
      .catch(_ => {
        this.generalService.showSnackbar("No dashboard available", "OK")
        this.router.navigate(['/dashboards'])
      });
  }

  submitAddDashboardForm() : void {
    const dashboardDto: DashboardDto = {
      team: this.addDashboardForm.value.team ?? null,
      id: -1,
      dashboardName: this.addDashboardForm.value.name ?? '',
      dashboardUrl: this.addDashboardForm.value.dashboardUrl ?? '',
      hasAccess: false
    };
    console.log(dashboardDto)
    this.dashboardService.addDashboard(dashboardDto)
      .then(_ => {
        this.router.navigate(['/dashboards']).catch(_ => {console.log('no page found');});
        this.generalService.showSnackbar("Dashboard added successfully", "ok", {})
        this.dialogRef.close()
      })
      .catch(_ => {this.generalService.showSnackbar("Dashboard added failed", "ok", {});})
  }

  displayFn(team?: any): string {
    return team ? team.name : undefined;
  }

  private _filter(value: string): Team[] {
    const filterValue = value.toLowerCase();
    console.log(value)
    return this.teams.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
