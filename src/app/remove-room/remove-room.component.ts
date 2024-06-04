import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Team} from "../dto/team";
import {DashboardService} from "../services/dashboard.service";
import {TeamService} from "../services/team.service";
import {TeamCollection} from "../dto/teamCollection";
import {RoomDto} from "../dto/roomDto";
import {RoomService} from "../services/room.service";
import {GeneralService} from "../services/general.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RoomCollection} from "../dto/roomCollection";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-remove-room',
  standalone: true,
  imports: [
    MatDialogContent,
    MatIcon,
    MatFormField,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatLabel,
    NgForOf,
    MatButton,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatInput
  ],
  templateUrl: './remove-room.component.html',
  styleUrl: './remove-room.component.css'
})
export class RemoveRoomComponent {
  teamId: number | undefined;
  rooms: RoomDto[] = [];

  roomFormControl = new FormControl(null, [Validators.required])
  filteredOptions: Observable<RoomDto[]> = new Observable<RoomDto[]>();

  removeRoomForm: FormGroup = new FormGroup({
    room: this.roomFormControl
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RemoveRoomComponent>,
    private roomService: RoomService
  ) {
    if (this.data) {
      this.teamId = data.teamId;
      this.rooms = this.data.rooms;
    }
    this.filteredOptions = this.roomFormControl.valueChanges
      .pipe(
        startWith<string | null>(''),
        map(value => this._filter(value!!))
      );
  }

  submitRemoveRoomForm() {
    this.roomService.removeTeamFromRoom(this.removeRoomForm.value.room.roomNo, this.teamId!!).then(r =>
      this.dialogRef.close(true)
    );
  }

  displayFn(room?: any): string {
    return room ? room.roomNo : undefined;
  }

  private _filter(value: string): RoomDto[] {
    const filterValue = value.toLowerCase();

    return this.rooms.filter(option => option.roomNo.toLowerCase().includes(filterValue));
  }

}
