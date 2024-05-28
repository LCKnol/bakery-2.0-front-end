import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DashboardCardComponent} from "../dashboard-card/dashboard-card.component";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PiService} from "../services/pi.service";
import {MatPaginator} from "@angular/material/paginator";
import {PiCollection} from "../dto/pi-collection";
import {from, Observable} from 'rxjs';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {Pi} from "../dto/pi";
import {MatTab, MatTabChangeEvent, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {GeneralService} from "../services/general.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {AssignDashboardComponent} from "../assign-dashboard/assign-dashboard.component";
import {InitPiComponent} from "../init-pi/init-pi.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DashboardDto} from "../dto/dashboardDto";
import {EditdashboardComponent} from "../editdashboard/editdashboard.component";
import {EditpiComponent} from "../editpi/editpi.component";

@Component({
  selector: 'app-pimanager',
  standalone: true,
  imports: [
    DashboardCardComponent,
    MatButton,
    MatCard,
    MatIcon,
    MatIconButton,
    MatInput,
    MatToolbar,
    NgForOf,
    RouterLink,
    MatTable,
    MatPaginator,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    NgIf,
    MatTabGroup,
    MatTab,
    MatTabLink,
    MatTabNav,
    NgOptimizedImage,
    MatTabNavPanel,
    MatFabButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatProgressSpinner
  ],
  templateUrl: './pimanager.component.html',
  styleUrl: './pimanager.component.css'
})
export class PimanagerComponent implements AfterViewInit {
  displayedColumns: string[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  dataSwitch: boolean = true

  macAddress: string | null = null;
  pingId: number | null = null

  constructor(private piService: PiService,
              private generalService: GeneralService,
              private router: Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              ) {
    this.showAllPis()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAssignDialog(pi:Pi) {
    const dialogRef = this.dialog.open(AssignDashboardComponent, {
      data: {
        pi:pi
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllPis()
    });
  }

  openPiRequestDialog(macAddress: string,ipAddress: string) {
    const dialogRef = this.dialog.open(InitPiComponent, {
      data: {
        macAddress:macAddress,
        ipAddress: ipAddress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showPiRequests()
    });
  }

  showAllPis() {
    this.piService.getAllPis().then(res => {
      this.dataSource = new MatTableDataSource<Pi>(res.pis)
      this.displayedColumns = ['name', 'status', 'macaddress', 'ipaddress', 'room', 'display', 'action']
      this.dataSource.paginator = this.paginator;
      this.dataSwitch = true
    });
  }

  showPiRequests() {
    this.piService.getPiRequests().then(res => {
      this.dataSource = new MatTableDataSource<any>(res.piRequests)
      this.displayedColumns = ['requestedon', 'macaddress', 'ipaddress', 'action']
      this.dataSource.paginator = this.paginator;
      this.dataSwitch = false
    });
  }

  switchView(tab: MatTabChangeEvent) {
    if (tab.index == 0) {
      this.showAllPis()
    } else if (tab.index == 1) {
      this.showPiRequests()
    }
  }

  openEditDialog(pi:Pi) {
    const dialogRef = this.dialog.open(EditpiComponent, {
      data: {
        pi: pi
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllPis()
    });
  }

  pingPi(id: number) {
    this.piService.pingPi(id).then(_ => {
      this.pingId = id
      setTimeout(() => {
        this.showAllPis();
        this.pingId = null
      }, 2000);
    });
  }

  rebootPi(pi: Pi) {
    this.piService.rebootPi(pi.id).then(() => {
      this.snackBar.open('Reboot command sent successfully!', 'Close', {
        duration: 3000
      });
    }).catch((error) => {
      console.error('Error sending reboot command:', error);
      this.snackBar.open('Failed to send reboot command', 'Close', {
        duration: 3000
      });
    });
  }

  setTv(piId: number, option: boolean) {
    this.piService.setTv(piId, option).then(() => {

    }).catch((error) => {
      console.error('Error sending command:', error);
      this.snackBar.open('Failed to send command', 'Close', {
        duration: 3000
      });
    });
  }
}

