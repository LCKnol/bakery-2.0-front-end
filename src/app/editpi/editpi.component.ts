import {Component, Inject} from '@angular/core';
import { MatSelect, MatOption } from '@angular/material/select';

import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { PiService } from '../services/pi.service';
import { GeneralService } from '../services/general.service';
import { Pi } from '../dto/pi';
import {RoomDto} from "../dto/roomDto";
import {RoomService} from "../services/room.service";
import {RoomCollection} from "../dto/roomCollection";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Team} from "../dto/team";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";


@Component({
  selector: 'app-editpi',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    ReactiveFormsModule,
    MatMiniFabButton,
    MatSelect,
    MatOption,
    NgForOf,
    MatDialogContent,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger
  ],
  templateUrl: './editpi.component.html',
  styleUrl: './editpi.component.css'
})
export class EditpiComponent {
  pi: Pi | undefined
  roomFormControl = new FormControl(null)
  filteredOptions: Observable<RoomDto[]> = new Observable<RoomDto[]>();
  rooms: RoomDto[] = []

  piEditForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    roomNo: this.roomFormControl
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private route: ActivatedRoute,
    private piService: PiService,
    private router: Router,
    private generalService: GeneralService,
    private roomService: RoomService,
    private dialogRef: MatDialogRef<EditpiComponent>
  ) {
      if (this.data) {
        this.pi = data.pi
      }
      this.fetchRooms();
  }

  fetchRooms() {
    // Make an HTTP GET request to your backend API to fetch room numbers
    this.roomService.getAllRooms().then((rooms: RoomCollection) => {
      this.rooms = rooms.rooms.filter(room => room.roomNo != this.pi?.roomNo)
      this.setFormValues()
      this.filteredOptions = this.roomFormControl.valueChanges
        .pipe(
          startWith<string | null>(''),
          map(value => this._filter(value!!))
        );
    });
  }
  setFormValues() {
    if (this.pi) {
      this.piEditForm.controls['name'].setValue(this.pi.name);
    }
  }

  async submitEditPiForm() {

    const editPi: Pi = {
      id: this.pi?.id!!, // Assumes piId is non-null
      name: this.piEditForm.value.name ?? this.pi?.name,
      roomNo: this.piEditForm.value.roomNo ?? '',
      status: this.pi?.status ?? "",
      dashboardName: this.pi?.dashboardName ?? "",
      macAddress: this.pi?.macAddress ?? "",
      dashboardId:this.pi?.dashboardId?? -1,
      ipAddress: this.pi?.ipAddress!!,
    };
    // Call the service to update the Pi data
    await this.piService.editPi(editPi)
      .then(_ => {
        this.generalService.showSnackbar('Pi data successfully updated', 'OK', {duration: 3000})
        this.dialogRef.close()
      }).catch(_ => {
        this.generalService.showSnackbar('Error while updating Pi', 'OK')
      })
  }


  displayFn(room?: any): string {
    return room? room : undefined;
  }

  private _filter(value: string): RoomDto[] {
    const filterValue = value.toLowerCase();
    return this.rooms.filter(option => option.roomNo.toLowerCase().includes(filterValue));
  }
}
