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
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {DashboardDto} from "../dto/dashboardDto";
import {DashboardService} from "../services/dashboard.service";
import {DashboardCollection} from "../dto/dashboardCollection";
import {NgForOf} from "@angular/common";
import {Pi} from "../dto/pi";
import {PiService} from "../services/pi.service";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

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
  ],
  templateUrl: './assign-dashboard.component.html',
  styleUrl: './assign-dashboard.component.css'
})
export class AssignDashboardComponent {
  dashboards?: DashboardDto[] = [];
  pi: Pi | undefined

  assignDashboardForm: FormGroup = new FormGroup({
    dashboardList: new FormControl()
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<AssignDashboardComponent>, private dashboardService: DashboardService, private piService: PiService,) {
    if (this.data) {
      this.pi = data.pi
    }
    dashboardService.getDashboards().then((dashboard: DashboardCollection) => {
      this.dashboards = dashboard.dashboards.filter(dashboard => dashboard.id !== this.pi?.dashboardId);
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
      dashboardId: this.assignDashboardForm.value.dashboardList
    };
    this.piService.assignDashboard(newPi)
    this.dialogRef.close(true);
  }

}
