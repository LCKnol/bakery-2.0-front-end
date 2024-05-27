import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RoomDto} from "../dto/roomDto";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {RoomService} from "../services/room.service";
import {Router} from "@angular/router";
import {GeneralService} from "../services/general.service";
import {RoomCollection} from "../dto/roomCollection";
import {UserCollection} from "../dto/userCollection";
import {UserService} from "../services/user.service";
import {User} from "../dto/user";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatDialogContent,
    MatIcon,
    MatLabel,
    NgForOf
  ],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css'
})
export class AddMemberComponent {
  addMemberForm: FormGroup = new FormGroup({
    name: new FormControl(),

  });

  userCollection : User[] = []


  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<AddMemberComponent>,
              private userService: UserService, private router: Router, private generalService: GeneralService) {
    this.dialogRef.updateSize('40%')
    this.fetchMembers()

  }


  fetchMembers() {
    this.userService.getAllUsers().then((userCollection: UserCollection) => {
      this.userCollection = userCollection.userCollection
    });
  }


  submitAddMemberForm() {
    const user: User = {
      id: -1,
      firstName: this.addMemberForm.value.firstname,
      lastName: this.addMemberForm.value.lastname,
      email: this.addMemberForm.value.email,
      password: this.addMemberForm.value.password,
      isAdmin: this.addMemberForm.value.isAdmin,
      teams: this.addMemberForm.value.teams
    };
    this.userService.addUser(user)
      .then(token => {
        this.generalService.showSnackbar("Room added successfully", "ok", {})
        this.dialogRef.close()
      })
      .catch(_ => {
        this.generalService.showSnackbar("Adding Room failed", "ok", {});
      });
  }
}

