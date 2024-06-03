import {AfterViewInit, Component, ViewChild} from '@angular/core';
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
import {AssignRoomComponent} from "../assign-room/assign-room.component";
import * as console from "node:console";
import {DeleteTeamFromRoomComponent} from "../delete-team-from-room/delete-team-from-room.component";
import {AddTeamToRoomComponent} from "../add-team-to-room/add-team-to-room.component";
import {User} from "../dto/user";
import {DashboardDto} from "../dto/dashboardDto";
import {FormsModule} from "@angular/forms";
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
    MatMenuTrigger,
    FormsModule
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements AfterViewInit {
  displayedColumns: string[] = []
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>()
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  rooms?: RoomDto[] = [];
  filteredRooms?: RoomDto[] = [];



  constructor(private roomService: RoomService, private generalService: GeneralService, private router: Router, public dialog: MatDialog) {
    this.showAllRooms()
  }

  private showAllRooms() {
      this.roomService.getAllRoomsAndTeams().then(res  => {
      this.dataSource = new MatTableDataSource<RoomDto>(res.rooms);
      this.displayedColumns = ['roomNo','teams','action'];
      this.dataSource.paginator = this.paginator;
      this.rooms = res.rooms;
      this.filteredRooms = res.rooms
    });
}

  openAddDialog() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllRooms()
    });
  }

  openDeleteTeamFromRoomDialog(room: RoomDto){
    const dialogRef = this.dialog.open(DeleteTeamFromRoomComponent, {
      data: {
        room:room
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllRooms()
    });
  }

  openAddTeamToRoomDialog(room: RoomDto){
    const dialogRef = this.dialog.open(AddTeamToRoomComponent, {
      data: {
        room:room
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllRooms()
    });
  }
  deleteRoom(room: RoomDto) {
    this.roomService.deleteRoom(room.roomNo).then(() => {this.showAllRooms()})
  }

  ngAfterViewInit(): void {
    this.showAllRooms()
  }

  filterResults(text: string) {
    if (!text) {
      this.dataSource = new MatTableDataSource<RoomDto>(this.rooms)
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.filteredRooms = this.rooms?.filter(
      room => room?.roomNo.toLowerCase().includes(text.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<RoomDto>(this.filteredRooms)
    this.dataSource.paginator = this.paginator;
  }
}

