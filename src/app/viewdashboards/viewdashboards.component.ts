import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {DashboardCardComponent} from '../dashboard-card/dashboard-card.component'
import {NavbarComponent} from '../navbar/navbar.component'
import {DashboardCollection} from '../dto/dashboardCollection'
import {DashboardService} from "../services/dashboard.service";
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DashboardDto} from "../dto/dashboardDto";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {AddDashboardComponent} from "../add-dashboard/add-dashboard.component";
import {MatCard} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {MatTab, MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {Pi} from "../dto/pi";
import {AssignDashboardComponent} from "../assign-dashboard/assign-dashboard.component";
import {EditdashboardComponent} from "../editdashboard/editdashboard.component";


@Component({
  selector: 'app-viewdashboards',
  standalone: true,
  imports: [DashboardCardComponent, NavbarComponent, CommonModule, MatButton, MatToolbar, NgOptimizedImage, RouterLink, MatFormField, MatInput, MatIcon, MatCard, MatIconButton, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatMenu, MatMenuItem, MatPaginator, MatRow, MatRowDef, MatTab, MatTabGroup, MatTable, MatHeaderCellDef, MatMenuTrigger],
  templateUrl: './viewdashboards.component.html',
  styleUrl: './viewdashboards.component.css'
})
export class ViewdashboardsComponent implements AfterViewInit {
  dashboards?: DashboardDto[] = [];
  filteredDashboards?: DashboardDto[] = [];
  displayedColumns: string[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  dataSwitch: boolean = true

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) {
    this.showAllDashboards()
  }

  filterResults(text: string) {
    if (!text) {
      this.dataSource = new MatTableDataSource<DashboardDto>(this.dashboards)
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.filteredDashboards = this.dashboards?.filter(
      dashboard => dashboard?.dashboardName.toLowerCase().includes(text.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<DashboardDto>(this.filteredDashboards)
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openEditDialog(dashboard: DashboardDto) {
    const dialogRef = this.dialog.open(EditdashboardComponent, {
      data: {
        dashboard: dashboard
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllDashboards()
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddDashboardComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.showAllDashboards()
    });
  }

  switchView(tab: MatTabChangeEvent) {
    if (tab.index == 0) {
      this.showAllDashboards()
    } else if (tab.index == 1) {
      // this.showPiRequests()
    }
  }

  showAllDashboards() {
    this.dashboardService.getDashboards().then(res => {
      this.dataSource = new MatTableDataSource<DashboardDto>(res.dashboards)
      this.displayedColumns = ['name', 'team', 'url', 'refresh', 'action']
      this.dataSource.paginator = this.paginator;
      this.dashboards = res.dashboards;
      this.filteredDashboards = res.dashboards
      this.dataSwitch = true
    });
  }

  // showMydashboards(){
  //   this.dashboardService.getDashboardsFromUser().then(res => {
  //     this.dataSource = new MatTableDataSource<any>(res.piRequests)
  //     this.displayedColumns = ['requestedon','macaddress','action']
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSwitch = false
  //   });
  // }

}
