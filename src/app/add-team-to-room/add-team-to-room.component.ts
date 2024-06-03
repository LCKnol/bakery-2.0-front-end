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
import {AsyncPipe, NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {RoomDto} from "../dto/roomDto";
import {RoomService} from "../services/room.service";
import {MatTableDataSource} from "@angular/material/table";
import {TeamCollection} from "../dto/teamCollection";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";

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
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
  ],
  templateUrl: './add-team-to-room.component.html',
  styleUrl: './add-team-to-room.component.html'
})
export class AddTeamToRoomComponent {
  roomNo: String | undefined
  teams: Team[] = []
  teamFormControl = new FormControl(null)
  filteredOptions: Observable<Team[]> = new Observable<Team[]>();

  addTeamToRoomForm: FormGroup = new FormGroup({
    team: this.teamFormControl
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private generalService: GeneralService, private dialogRef: MatDialogRef<AddTeamToRoomComponent>, private roomService: RoomService,private teamService: TeamService) {
    if (this.data) {
      this.roomNo = this.data.room.roomNo;
      this.fetchTeams()
    }
  }

  submitAddTeamToRoomForm() {
    this.roomService.addTeamToRoom(this.roomNo!!,this.addTeamToRoomForm.value.team.id).then(r =>
      this.dialogRef.close(true)).catch(_ => {
      this.generalService.showSnackbar("Adding team failed", "ok", {});
      this.dialogRef.close()
    })
  }

  fetchTeams() {
    this.teamService.getTeamsNotInRoom(this.roomNo!!).then((teamCollection: TeamCollection) => {
      this.teams = teamCollection.teamCollection
      this.filteredOptions = this.teamFormControl.valueChanges
        .pipe(
          startWith<string | null>(''),
          map(value => this._filter(value!!))
        );
    });
  }

  displayFn(team?: any): string {
    return team ? team.name : undefined;
  }

  private _filter(value: string): Team[] {
    const filterValue = value.toLowerCase();

    return this.teams.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}

