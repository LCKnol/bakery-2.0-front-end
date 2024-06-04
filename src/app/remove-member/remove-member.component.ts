import { Component, Inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { TeamService } from "../services/team.service";
import { GeneralService } from "../services/general.service";
import { Member } from "../dto/member";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Observable} from "rxjs";
import {Team} from "../dto/team";
import {User} from "../dto/user";
import {map, startWith} from "rxjs/operators";
import {MatInput} from "@angular/material/input";

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
    MatLabel,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput
  ],
  templateUrl: './remove-member.component.html',
  styleUrl: './remove-member.component.css'
})
export class RemoveMemberComponent {
  teamId: number | undefined;
  members: Member[] = [];
  memberFormControl = new FormControl(null, [Validators.required])
  filteredOptions: Observable<Member[]> = new Observable<Member[]>();

  removeMemberForm: FormGroup = new FormGroup({
    members: this.memberFormControl
  });

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
    this.filteredOptions = this.memberFormControl.valueChanges
      .pipe(
        startWith<string | null>(''),
        map(value => this._filter(value!!))
      );
  }

  submitRemoveMemberForm() {
    const memberId = this.removeMemberForm.value.members.id;
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

  displayFn(member?: any): string {
    return member ? member.firstName : undefined;
  }

  private _filter(value: string): Member[] {
    const filterValue = value.toLowerCase();

    return this.members.filter(option => option.firstName.toLowerCase().includes(filterValue));
  }
}
