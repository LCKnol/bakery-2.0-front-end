import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { TeamService } from "../services/team.service";
import { GeneralService } from "../services/general.service";
import { member } from "../dto/member";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-remove-member',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatIcon,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    NgForOf,
    MatLabel
  ],
  templateUrl: './remove-member.component.html',
  styleUrl: './remove-member.component.css'
})
export class RemoveMemberComponent {
  removeMemberForm: FormGroup = new FormGroup({
    members: new FormControl()
  });

  teamId: number | undefined;
  members: member[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RemoveMemberComponent>,
    private teamService: TeamService,
    private generalService: GeneralService
  ) {
    if (data) {
      this.teamId = data.teamId;
      this.members = data.members;
    }
  }

  submitRemoveMemberForm() {
    const memberId = this.removeMemberForm.value.members;
    this.teamService.removeUserFromTeam(memberId, this.teamId!!)
      .then(_ => {
        this.generalService.showSnackbar("Member removed successfully", "ok", {});
        this.dialogRef.close();
      })
      .catch(_ => {
        this.generalService.showSnackbar("Removing Member failed", "ok", {});
        this.dialogRef.close();
      });
  }
}
