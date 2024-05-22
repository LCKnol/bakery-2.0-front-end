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
  templateUrl: './delete-team-from-room.component.html',
  styleUrl: './delete-team-from-room.component.html'
})
export class DeleteTeamFromRoomComponent {
    deleteTeamFromRoomForm: FormGroup = new FormGroup({
    roomNo: new FormControl(''),
  });

  teams: Team[] = []

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<DeleteTeamFromRoomComponent>,private roomService: RoomService, private teamService: TeamService, private router: Router, private generalService: GeneralService) {
    this.setTeams()
  }

  private async setTeams() {
  //   this.roomService.getAvalibleTeams(room).then(res => {
  //     this.teams = new MatTableDataSource<RoomDto>(res.rooms);
  // });
  }


  submitDeleteTeamFromRoomForm() : void {
    const roomDto: RoomDto = {
      roomNo: this.deleteTeamFromRoomForm.value.roomNo ?? '',
    };
    this.roomService.addRoom(roomDto)
      .then(token => {
        this.router.navigate(['/rooms']).catch(_ => {console.log('no page found');});
        this.generalService.showSnackbar("Room added successfully", "ok", {})
        this.dialogRef.close()
      })
      .catch(_ => {this.generalService.showSnackbar("Room added failed", "ok", {});})
  }

}

