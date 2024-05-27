import {AfterViewInit, Component, ViewChild} from '@angular/core';
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
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TeamInfo} from "../dto/team.info";
import {AddRoomComponent} from "../add-room/add-room.component";
import {AddMemberComponent} from "../add-member/add-member.component";
import {RemoveMemberComponent} from "../remove-member/remove-member.component";
import {RemoveRoomComponent} from "../remove-room/remove-room.component";
import {AddTeamComponent} from "../add-team/add-team.component";


@Component({
  selector: 'app-team-manager',
  standalone: true,
  imports: [
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
    MatMenuTrigger,
    MatHeaderCellDef,
    NgForOf
  ],
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent implements AfterViewInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<TeamInfo> = new MatTableDataSource<TeamInfo>();
  teams?: TeamInfo[] = [];
  filteredTeams?: TeamInfo[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private router: Router, public dialog: MatDialog) {
    this.showAllTeams();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openAddTeamDialog() {
    const dialogRef = this.dialog.open(AddTeamComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }

  deleteTeam(id: string) {

    this.showAllTeams();
  }

  private showAllTeams() {

    const teams: TeamInfo[] = [
      {
        id: 1,
        name: 'Team 1',
        members: ['Alice', 'Bob'],
        rooms: ['Room 101', 'Room 102']
      },
      {
        id: 2,
        name: 'Team 2',
        members: ['Charlie', 'Dave'],
        rooms: ['Room 201', 'Room 202']
      }
    ];
    this.dataSource = new MatTableDataSource<TeamInfo>(teams);
    this.displayedColumns = ['name', 'members', 'rooms', 'action'];
    this.dataSource.paginator = this.paginator;
    this.teams = teams;
    this.filteredTeams = teams;
  }

  filterResults(text: string) {
    if (!text) {
      this.dataSource = new MatTableDataSource<TeamInfo>(this.teams);
      this.dataSource.paginator = this.paginator;
      return;
    }
    this.filteredTeams = this.teams?.filter(
      team => team?.name.toLowerCase().includes(text.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<TeamInfo>(this.filteredTeams);
    this.dataSource.paginator = this.paginator;
  }

  addRoom(teamId: string) {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      data: { teamId: teamId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }

  removeRoom(teamId: string) {
    const dialogRef = this.dialog.open(RemoveRoomComponent, {
      data: { teamId: teamId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }

  addMember(teamId: string) {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      data: { teamId: teamId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }

  removeMember(teamId: string) {
    const dialogRef = this.dialog.open(RemoveMemberComponent, {
      data: { teamId: teamId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }
}
