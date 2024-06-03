import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {RoomDto} from "../dto/roomDto";
import {User} from "../dto/user";
import {TeamService} from "../services/team.service";
import {RoomService} from "../services/room.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {GeneralService} from "../services/general.service";
import {RoomCollection} from "../dto/roomCollection";
import {UserCollection} from "../dto/userCollection";
import {TeamInfo} from "../dto/team.info";

@Component({
  selector: 'app-add-room',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatDialogContent,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  addRoomForm: FormGroup = new FormGroup({

    room: new FormControl()
  });

  rooms: RoomDto[] = []
  teamRooms: RoomDto[] = []
  teamId : number | undefined


  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<AddRoomComponent>,
               private roomService: RoomService, private router: Router, private generalService: GeneralService) {
    this.dialogRef.updateSize('40%')
    if (data) {
      this.teamId = data.teamId;
      this.teamRooms = data.rooms;
    }
    this.fetchRooms()
  }

  fetchRooms() {
    this.roomService.getAllRooms().then((roomCollection: RoomCollection) => {
      this.rooms = roomCollection.rooms.filter(item=> !this.teamRooms.some(item2=> item.roomNo === item2.roomNo));
      })
    }

  submitAddRoomForm() {
    this.roomService.addTeamToRoom(this.addRoomForm.value.room, this.teamId!!)
      .then(_ => {
        this.generalService.showSnackbar("Room added successfully", "ok", {})
        this.dialogRef.close()
      })
      .catch(_ => {
        this.generalService.showSnackbar("Adding Room failed", "ok", {});
      });
  }
}
