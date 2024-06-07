import {AfterViewInit, Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {DashboardDto} from "../dto/dashboardDto";
import {DashboardService} from "../services/dashboard.service";
import {DashboardCollection} from "../dto/dashboardCollection";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Pi} from "../dto/pi";
import {PiService} from "../services/pi.service";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {GeneralService} from "../services/general.service";
import {Observable} from "rxjs";
import {Team} from "../dto/team";
import {map, startWith} from "rxjs/operators";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
  selector: 'app-assign-dashboard',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatLabel,
    NgForOf,
    MatCard,
    MatIcon,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe,
  ],
  templateUrl: './assign-dashboard.component.html',
  styleUrl: './assign-dashboard.component.css'
})
export class AssignDashboardComponent {
  dashboards: DashboardDto[] = [];
  pi: Pi | undefined
  dashboardFormControl = new FormControl(null, [Validators.required])
  filteredOptions: Observable<DashboardDto[]> = new Observable<DashboardDto[]>();

  assignDashboardForm: FormGroup = new FormGroup({
    newDashboard: this.dashboardFormControl
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private generalService: GeneralService, private dialogRef: MatDialogRef<AssignDashboardComponent>, private dashboardService: DashboardService, private piService: PiService,) {
    if (this.data) {
      this.pi = data.pi
    }
    dashboardService.getDashboards().then((dashboard: DashboardCollection) => {
      this.dashboards = dashboard.dashboards.filter(dashboard => dashboard.id !== this.pi?.dashboardId);
      this.filteredOptions = this.dashboardFormControl.valueChanges
        .pipe(
          startWith<string | null>(''),
          map(value => this._filter(value!!))
        );
    });
  }

  submitAssignDashboardForm() {
    const newPi: Pi = {
      id: this.pi?.id!!,
      name: this.pi?.name!!,
      macAddress: this.pi?.macAddress!!,
      ipAddress: this.pi?.ipAddress!!,
      status: this.pi?.status!!,
      dashboardName: this.pi?.dashboardName!!,
      roomNo: this.pi?.roomNo!!,
      dashboardId: this.assignDashboardForm.value.newDashboard.id
    };

    this.piService.assignDashboard(newPi).then(_ => {
      this.dialogRef.close(true)
      this.generalService.showSnackbar("Dashboard succesfully updated", "OK")
    }).catch(_ => {
      this.generalService.showSnackbar("Error while assigning dashboard", "OK")
      this.dialogRef.close()
    })
  }

  displayFn(dashboard?: any): string {
    return dashboard ? dashboard.dashboardName : undefined;
  }

  private _filter(value: string): DashboardDto[] {
    const filterValue = value.toLowerCase();

    return this.dashboards.filter(option => option.dashboardName.toLowerCase().includes(filterValue));
  }
}
