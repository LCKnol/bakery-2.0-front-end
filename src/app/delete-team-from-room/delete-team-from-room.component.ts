import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatOption, MatSelect} from "@angular/material/select";
import {TeamService} from "../services/team.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {RoomService} from "../services/room.service";
import {Team} from "../dto/team";
import {GeneralService} from "../services/general.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";

@Component({
  selector: 'app-assign-room',
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
  templateUrl: './delete-team-from-room.component.html',
  styleUrl: './delete-team-from-room.component.html'
})
export class DeleteTeamFromRoomComponent {
  roomNo: String | undefined
  teams: Team[] = []
  teamFormControl = new FormControl(null)
  filteredOptions: Observable<Team[]> = new Observable<Team[]>();

  deleteTeamFromRoomForm: FormGroup = new FormGroup({
    team: this.teamFormControl
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<DeleteTeamFromRoomComponent>, private roomService: RoomService,private generalService: GeneralService) {
    if (this.data) {
      this.roomNo = this.data.room.roomNo
      this.teams = this.data.room.teamCollection.teamCollection
      this.filteredOptions = this.teamFormControl.valueChanges
        .pipe(
          startWith<string | null>(''),
          map(value => this._filter(value!!))
        );
    }
  }

  submitDeleteTeamFromRoomForm() {
    this.roomService.removeTeamFromRoom(this.roomNo!!,this.deleteTeamFromRoomForm.value.team.id).then(r =>
    {this.dialogRef.close(true)
      this.generalService.showSnackbar("Succesfully deleted team", "OK")
    }).catch(_ => {
        this.dialogRef.close(true)
        this.generalService.showSnackbar("Error while deleting team", "OK")
      })
  }

  displayFn(team?: any): string {
    return team ? team.name : undefined;
  }

  private _filter(value: string): Team[] {
    const filterValue = value.toLowerCase();

    return this.teams.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
