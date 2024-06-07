import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {Team} from "../dto/team";

import {TeamService} from "../services/team.service";
import {Router} from "@angular/router";
import {GeneralService} from "../services/general.service";
import {TeamCollection} from "../dto/teamCollection";
import {User} from "../dto/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-add-user',
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
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUserForm: FormGroup = new FormGroup({
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    isAdmin: new FormControl('',[Validators.required])
  });

  teams: Team[] = []

  constructor(private dialogRef: MatDialogRef<AddUserComponent>,private userService: UserService, private teamService: TeamService, private router: Router, private generalService: GeneralService) {
    this.dialogRef.updateSize('40%')
  }
  submitAddUserForm() {
    const user: User = {
      id: -1,
      firstName: this.addUserForm.value.firstname,
      lastName: this.addUserForm.value.lastname,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      isAdmin: this.addUserForm.value.isAdmin,
      teams: []
    };
    this.userService.addUser(user)
      .then(token => {
        this.generalService.showSnackbar("User added successfully", "ok", {})
        this.dialogRef.close()
      })
      .catch(_ => {
        this.generalService.showSnackbar("Adding user failed", "ok", {});
        this.dialogRef.close()
      })
  }
}
