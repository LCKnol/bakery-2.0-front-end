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
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {AsyncPipe, NgForOf} from "@angular/common";
import {TeamCollection} from "../dto/teamCollection";
import {TeamService} from "../services/team.service";
import {Team} from "../dto/team";
import {merge, Observable, of} from "rxjs";
import {map, startWith} from 'rxjs/operators';

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
    NgForOf,
    MatAutocomplete,
    MatAutocompleteTrigger,
    AsyncPipe
  ],
  templateUrl: './editdashboard.component.html',
  styleUrl: './editdashboard.component.css'
})
export class EditdashboardComponent {
  private dashboardId?: number
  dashboard?: DashboardDto
  team?: Team
  teams: Team[] = []
  teamFormControl = new FormControl('')
  filteredOptions: Observable<Team[]> = new Observable<Team[]>();

  dashboardEditForm: FormGroup = new FormGroup({
    name: new FormControl(),
    dashboardUrl: new FormControl(),
    imageUrl: new FormControl(),
    team: this.teamFormControl
  })


  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private teamService: TeamService, private router: Router, private generalService: GeneralService) {
    this.route.params.subscribe(params => {
      this.dashboardId = params['dashboardId'];
    });

    this.fetchDashboard()
    this.fetchTeams()

  }

  fetchTeams() {
    // Make an HTTP GET request to your backend API to fetch room numbers
    this.teamService.getAllTeams().then((teamCollection: TeamCollection) => {
      this.teams = teamCollection.teamCollection.filter(team => team.id !== this.team?.id)
      this.setFormValues()
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

  fetchDashboard() {
    this.dashboardService.getDashboard(this.dashboardId!)
    .then((dashboard: DashboardDto) => {
      this.dashboard = dashboard;
      this.team = dashboard.team
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
  displayFn(team?: any): string {
    return team ? team.name : undefined;
  }

  private _filter(value: string): Team[] {
    const filterValue = value.toLowerCase();

    return this.teams.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}

