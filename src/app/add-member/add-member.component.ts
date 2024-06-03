import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { UserService } from "../services/user.service";
import { TeamService } from "../services/team.service";
import { GeneralService } from "../services/general.service";
import { UserCollection } from "../dto/userCollection";
import { User } from "../dto/user";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NgForOf } from "@angular/common";

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
    members: new FormControl()
  });

  teamId: number | undefined;
  userCollection: User[] = [];
  teamMembers: User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddMemberComponent>,
    private userService: UserService,
    private teamService: TeamService,
    private generalService: GeneralService
  ) {
    this.dialogRef.updateSize('40%');
    if (data) {
      this.teamId = data.teamId;
     this.teamMembers = data.teamMembers;
    }
    this.fetchMembers();
  }

  fetchMembers() {
    this.userService.getAllUsers().then((userCollection: UserCollection) => {
      this.userCollection = userCollection.userCollection.filter(item =>
        !this.teamMembers.some(item2 => item.id === item2.id)
      );
    });
  }


  submitAddMemberForm() {
   // const userId = this.addMemberForm.value.members;
    this.teamService.assignUserToTeam(this.addMemberForm.value.members.id, this.teamId!!)
      .then(_ => {
        this.generalService.showSnackbar("Member added successfully", "ok", {});
        this.dialogRef.close();
      })
      .catch(_ => {
        this.generalService.showSnackbar("Adding Member failed", "ok", {});
        this.dialogRef.close();
      });
  }
}
