import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Team} from "../dto/team";
import {DashboardService} from "../services/dashboard.service";
import {TeamService} from "../services/team.service";
import {TeamCollection} from "../dto/teamCollection";
import {RoomDto} from "../dto/roomDto";
import {RoomService} from "../services/room.service";
import {GeneralService} from "../services/general.service";
import {NgForOf} from "@angular/common";
import {RoomCollection} from "../dto/roomCollection";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-remove-room',
  standalone: true,
  imports: [
    MatDialogContent,
    MatIcon,
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatLabel,
    NgForOf,
    MatButton
  ],
  templateUrl: './remove-room.component.html',
  styleUrl: './remove-room.component.css'
})
export class RemoveRoomComponent {
  teamId: number | undefined;
  rooms: RoomDto[] = [];

  removeRoomForm: FormGroup = new FormGroup({
    room: new FormControl()
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RemoveRoomComponent>,
    private teamService: TeamService,
    private roomService: RoomService
  ) {
    if (this.data) {
      this.teamId = data.teamId;
      this.rooms = this.data.rooms;
    }
  }

  submitRemoveRoomForm() {
    this.roomService.removeTeamFromRoom(this.removeRoomForm.value.room.roomNo, this.teamId!!).then(r =>
      this.dialogRef.close(true)
    );
  }

}
