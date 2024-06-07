import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatPaginator } from "@angular/material/paginator";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { MatToolbar } from "@angular/material/toolbar";
import { NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TeamInfo } from "../dto/team.info";
import { AssignRoomComponent } from "../assign-room/assign-room.component";
import { AddMemberComponent } from "../add-member/add-member.component";
import { RemoveMemberComponent } from "../remove-member/remove-member.component";
import { RemoveRoomComponent } from "../remove-room/remove-room.component";
import { AddTeamComponent } from "../add-team/add-team.component";
import { TeamService } from "../services/team.service";
import {Team} from "../dto/team";
import {TeamInfoCollection} from "../dto/TeamInfoCollection";
import {RoomDto} from "../dto/roomDto";
import {User} from "../dto/user";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
    NgForOf,
    MatIconButton,
    MatHeaderCellDef,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'members', 'rooms', 'action'];
  dataSource: MatTableDataSource<TeamInfo> = new MatTableDataSource<TeamInfo>();
  teams: TeamInfo[] = [];
  filteredTeams: TeamInfo[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(public dialog: MatDialog, private teamService: TeamService) {
    this.showAllTeams();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  openAddTeamDialog() {
    const dialogRef = this.dialog.open(AddTeamComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }

  deleteTeam(id: number) {
    this.teamService.deleteTeam(id).then(() => {
      this.showAllTeams();
    });
  }

  private showAllTeams() {
    this.teamService.getAllTeamsInfo().then(res => {
      this.dataSource = new MatTableDataSource<TeamInfo>(res.teamInfoCollection);
      this.displayedColumns = ['name', 'members', 'rooms', 'action'];
      this.dataSource.paginator = this.paginator;
      this.teams = res.teamInfoCollection;
      this.filteredTeams = res.teamInfoCollection;
    });
  }



  filterResults(text: string) {
    if (!text) {
      this.dataSource.data = this.teams;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      return;
    }
    this.filteredTeams = this.teams.filter(
      team => team.name.toLowerCase().includes(text.toLowerCase())
    );
    this.dataSource.data = this.filteredTeams;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  addRoom(teamInfo: TeamInfo) {
    const dialogRef = this.dialog.open(AssignRoomComponent, {
      data: {
        teamId: teamInfo.id,
        rooms: teamInfo.rooms,
      }

    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }

  removeRoom(teamId: number,rooms:RoomDto[]) {
    const dialogRef = this.dialog.open(RemoveRoomComponent, {
      data: {
        teamId: teamId,
        rooms: rooms
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }

  addMember(teamInfo: TeamInfo) {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      data: { teamId: teamInfo.id,
        teamMembers:teamInfo.members
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }

  removeMember(teamId: number,members:User[]) {
    const dialogRef = this.dialog.open(RemoveMemberComponent, {
      data: {
        teamId: teamId,
        members: members
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showAllTeams();
    });
  }



}
