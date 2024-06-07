import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RoomDto} from "../dto/roomDto";
import {User} from "../dto/user";
import {TeamService} from "../services/team.service";
import {RoomService} from "../services/room.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {GeneralService} from "../services/general.service";
import {RoomCollection} from "../dto/roomCollection";
import {UserCollection} from "../dto/userCollection";
import {TeamInfo} from "../dto/team.info";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs";
import {Team} from "../dto/team";

@Component({
  selector: 'app-assign-room',
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
    ReactiveFormsModule,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger
  ],
  templateUrl: './assign-room.component.html',
  styleUrl: './assign-room.component.css'
})
export class AssignRoomComponent {

  roomFormControl = new FormControl(null, [Validators.required])
  filteredOptions: Observable<RoomDto[]> = new Observable<RoomDto[]>();
  addRoomForm: FormGroup = new FormGroup({

    room: this.roomFormControl
  });


  rooms: RoomDto[] = []
  teamRooms: RoomDto[] = []
  teamId : number | undefined


  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<AssignRoomComponent>,
               private roomService: RoomService, private router: Router, private generalService: GeneralService) {
    if (data) {
      this.teamId = data.teamId;
      this.teamRooms = data.rooms;
    }
    this.fetchRooms()
  }

  fetchRooms() {
    this.roomService.getAllRooms().then((roomCollection: RoomCollection) => {
      this.rooms = roomCollection.rooms.filter(item=> !this.teamRooms.some(item2=> item.roomNo === item2.roomNo));
    this.filteredOptions = this.roomFormControl.valueChanges
      .pipe(
        startWith<string | null>(''),
        map(value => this._filter(value!!))
      );
    })
  }

  submitAddRoomForm() {
    console.log(this.addRoomForm.value.room)
    this.roomService.addTeamToRoom(this.addRoomForm.value.room.roomNo, this.teamId!!)
      .then(_ => {
        this.generalService.showSnackbar("Room added successfully", "ok", {})
        this.dialogRef.close()
      })
      .catch(_ => {
        this.generalService.showSnackbar("Adding Room failed", "ok", {});
        this.dialogRef.close()
      });
  }
  displayFn(room?: any): string {
    return room ? room.roomNo : undefined;
  }

  private _filter(value: string): RoomDto[] {
    const filterValue = value.toLowerCase();

    return this.rooms.filter(option => option.roomNo.toLowerCase().includes(filterValue));
  }
}
