import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {TeamService} from "../services/team.service";
import {RoomService} from "../services/room.service";
import {GeneralService} from "../services/general.service";
import {Router} from "@angular/router";
import {RoomCollection} from "../dto/roomCollection";
import {RoomDto} from "../dto/roomDto";
import {TeamInfo} from "../dto/team.info";
import {Member} from "../dto/member";
import {membersCollection} from "../dto/membersCollection";
import {UserService} from "../services/user.service";
import {UserCollection} from "../dto/userCollection";
import {UserInfo} from "../dto/userInfo";
import {User} from "../dto/user";

@Component({
  selector: 'app-add-team',
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
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {
  addTeamForm: FormGroup = new FormGroup({
    name: new FormControl()
  });

  constructor(private dialogRef: MatDialogRef<AddTeamComponent>,
              private teamService: TeamService, private generalService: GeneralService) {
  }

  submitAddTeamForm() {

    const team: TeamInfo = {
      id: -1,
      name: this.addTeamForm.value.name,
      members: [],
      rooms: [],
    };
    this.teamService.addTeam(team)
      .then(token => {
        this.generalService.showSnackbar("Team added successfully", "ok", {})
        this.dialogRef.close()
      })
      .catch(_ => {
        this.generalService.showSnackbar("Adding Team failed", "ok", {});
      });
  }
}
