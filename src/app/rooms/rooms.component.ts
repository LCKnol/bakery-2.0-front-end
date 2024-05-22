import {Component, ViewChild} from '@angular/core';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {MatTab, MatTabGroup, MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PiService} from "../services/pi.service";
import {GeneralService} from "../services/general.service";
import {RoomService} from "../services/room.service";
import {Pi} from "../dto/pi";
import {RoomCollection} from "../dto/roomCollection";
import {RoomDto} from "../dto/roomDto";
import {DashboardCardComponent} from "../dashboard-card/dashboard-card.component";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AddDashboardComponent} from "../add-dashboard/add-dashboard.component";
import {MatDialog} from "@angular/material/dialog";
import {AddRoomComponent} from "../add-room/add-room.component";


@Component({
  selector: 'app-rooms',
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
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  displayedColumns: string[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(private roomService: RoomService, private generalService: GeneralService, private router: Router, public dialog: MatDialog) {
    this.showAllRooms()
  }

  private showAllRooms() {
    this.roomService.getAllRooms().then(res  => {
      this.dataSource = new MatTableDataSource<RoomDto>(res.rooms);
      this.displayedColumns = ['roomNo', 'action'];
      this.dataSource.paginator = this.paginator;
    });
}

  openAddDialog() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllRooms()
    });
  }

  deleteRoom(room: RoomDto) {
    this.roomService.deleteRoom(room.roomNo).then(() => {this.showAllRooms()})
  }
}

