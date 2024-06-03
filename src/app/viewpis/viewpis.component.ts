import {Component, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
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
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatPaginator} from "@angular/material/paginator";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatToolbar} from "@angular/material/toolbar";
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {PiService} from "../services/pi.service";
import {GeneralService} from "../services/general.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Pi} from "../dto/pi";
import {DashboardDto} from "../dto/dashboardDto";
import {EditpiComponent} from "../editpi/editpi.component";
import {AssignDashboardComponent} from "../assign-dashboard/assign-dashboard.component";

@Component({
  selector: 'app-viewpis',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatMenu,
    MatMenuItem,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTab,
    MatTabGroup,
    MatTable,
    MatToolbar,
    NgIf,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatHeaderCellDef,
    MatMenuTrigger
  ],
  templateUrl: './viewpis.component.html',
  styleUrl: './viewpis.component.css'
})
export class ViewpisComponent {

  displayedColumns: string[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  dataSwitch: boolean = true
  pis?: Pi[] = [];
  filteredPis?: Pi[] = [];

  macAddress: string | null = null;
  pingId: number | null = null

  constructor(private piService: PiService,
              private generalService: GeneralService,
              private router: Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
  ) {
    this.showAllUserPis()
  }


  showAllUserPis() {
    this.piService.getPis().then(res => {
      this.dataSource = new MatTableDataSource<Pi>(res.pis)
      this.displayedColumns = ['name', 'status', 'macaddress', 'ipaddress', 'room', 'display', 'action']
      this.dataSource.paginator = this.paginator;
      this.pis = res.pis
      this.filteredPis = res.pis
    });
  }


  filterResults(text: string) {
    if (!text) {
      this.dataSource = new MatTableDataSource<Pi>(this.pis)
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.filteredPis = this.pis?.filter(
      pi => pi?.name.toLowerCase().includes(text.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Pi>(this.filteredPis)
    this.dataSource.paginator = this.paginator;
  }

  openEditDialog(pi:Pi) {
    const dialogRef = this.dialog.open(EditpiComponent, {
      data: {
        pi: pi
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllUserPis()
    });
  }

  pingPi(id: number) {
    this.piService.pingPi(id).then(_ => {
      this.pingId = id
      setTimeout(() => {
        this.showAllUserPis();
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

  openAssignDialog(pi:Pi) {
    const dialogRef = this.dialog.open(AssignDashboardComponent, {
      data: {
        pi:pi
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllUserPis()
    });
  }
}
