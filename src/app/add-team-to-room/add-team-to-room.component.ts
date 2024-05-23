import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {GeneralService} from "../services/general.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {Team} from "../dto/team";
import {TeamService} from "../services/team.service";
import {NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {RoomDto} from "../dto/roomDto";
import {RoomService} from "../services/room.service";
import {MatTableDataSource} from "@angular/material/table";
import {TeamCollection} from "../dto/teamCollection";

@Component({
  selector: 'app-add-room',
  standalone: true,

  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    MatLabel,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatIcon,
    MatSelect,
    MatOption,
    NgForOf,
    MatDialogContent,
  ],
  templateUrl: './add-team-to-room.component.html',
  styleUrl: './add-team-to-room.component.html'
})
export class AddTeamToRoomComponent {
  roomNo: String | undefined
  teams: Team[] = []
  addTeamToRoomForm: FormGroup = new FormGroup({
    team: new FormControl()
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<AddTeamToRoomComponent>, private roomService: RoomService,private teamService: TeamService) {
    if (this.data) {
      this.roomNo = this.data.room.roomNo;
      this.fetchTeams()
    }
  }

  submitAddTeamToRoomForm() {
    // this.teamService.removeUserFromTeam(this.userid!!,this.assignTeamForm.value.team).then(r =>
    //   this.dialogRef.close(true))
  }

  fetchTeams() {
    this.teamService.getTeamsNotInRoom(this.roomNo!!).then((teamCollection: TeamCollection) => {
      this.teams = teamCollection.teamCollection
    });
  }
}

