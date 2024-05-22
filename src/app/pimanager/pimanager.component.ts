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
import {LoginService} from "../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Pi} from "../dto/pi";
import {MatTab, MatTabChangeEvent, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import { HttpClient } from '@angular/common/http';
import {GeneralService} from "../services/general.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {AssignDashboardComponent} from "../assign-dashboard/assign-dashboard.component";

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
    MatMenuTrigger
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

  openDialog(pi:Pi) {
    const dialogRef = this.dialog.open(AssignDashboardComponent, {
      data: {
        pi:pi
      }
    });
  }
  showAllPis(){
    this.piService.getAllPis().then(res => {
      this.dataSource = new MatTableDataSource<Pi>(res.pis)
      this.displayedColumns = ['name', 'status', 'macaddress','room','display','action']
      this.dataSource.paginator = this.paginator;
      this.dataSwitch = true
    });
  }

  showPiRequests(){
    this.piService.getPiRequests().then(res => {
      this.dataSource = new MatTableDataSource<any>(res.piRequests)
      this.displayedColumns = ['requestedon','macaddress','action']
      this.dataSource.paginator = this.paginator;
      this.dataSwitch = false
    });
  }

  switchView(tab: MatTabChangeEvent) {
    if (tab.index == 0){
      this.showAllPis()
    }else if(tab.index == 1){
      this.showPiRequests()
    }
  }

  redirectToInitPi(macAddress: string) {

    const url = '/init-pi';
    const body = { macAddress };

    console.log("Sending MAC address:", macAddress); // Log the MAC address being sent
    // Convert Promise to Observable using 'from'
    const postObservable = from(this.generalService.post(url, body));

    postObservable.subscribe({
      next: (response) => {
        console.log('Response:', response);
        // Assuming response contains the necessary data to navigate
        this.router.navigate(['/init-pi'], { state: { data: macAddress}});
      },
      error: (error) => {
        console.error('Error:', error);
      }
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
}

