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
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  addRoomForm: FormGroup = new FormGroup({
    roomNo: new FormControl(''),
  });

  teams: TeamCollection = {teamCollection: []}

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<AddRoomComponent>,private roomService: RoomService, private teamService: TeamService, private router: Router, private generalService: GeneralService) {
  }


  submitAddRoomForm() : void {
    console.log(this.addRoomForm.value.roomNo)
    const roomDto: { roomNo: String, teams: TeamCollection } = {
      roomNo: this.addRoomForm.value.roomNo ?? '',
      teams: this.teams
      }

    this.roomService.addRoom(roomDto)
      .then(token => {
        this.router.navigate(['/rooms']).catch(_ => {console.log('no page found');});
        this.generalService.showSnackbar("Room added successfully", "ok", {})
        this.dialogRef.close()
      })
      .catch(_ => {this.generalService.showSnackbar("Room added failed", "ok", {});})
  }

}

