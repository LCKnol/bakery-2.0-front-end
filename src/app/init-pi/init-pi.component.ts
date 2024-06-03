import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {GeneralService} from "../services/general.service";
import {Pi} from "../dto/pi";
import {PiService} from "../services/pi.service";
import {RoomService} from "../services/room.service";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {RoomCollection} from "../dto/roomCollection";
import {RoomDto} from "../dto/roomDto";
import {NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";




@Component({
  selector: 'app-init-pi',
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
    MatOption,
    MatSelect,
    NgForOf,
    MatDialogContent,
  ],
  templateUrl: './init-pi.component.html',
  styleUrl: './init-pi.component.css'
})
export class InitPiComponent {
  addInitPiForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    roomNo: new FormControl('')
  });
  macAddress: string | undefined;
  ipAddress: string | undefined;
  rooms: RoomDto[] = []



  constructor(
    private router: Router,
    private piService: PiService,
    private generalService: GeneralService,
    private roomService: RoomService,
    @Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<InitPiComponent>,
  ) {
    if (this.data) {
    this.macAddress = data.macAddress;
      this.ipAddress = data.ipAddress
    }



    // Fetch room numbers from the backend API
    this.fetchRooms();
  }



  fetchRooms() {
    // Make an HTTP GET request to your backend API to fetch room numbers
    this.roomService.getAllRooms().then((rooms: RoomCollection) => {
      this.rooms = rooms.rooms
    });
  }

  submitInitPiForm() {
    const pi: Pi = {
      id: -1,
      name: this.addInitPiForm.value.name ?? '',
      macAddress: this.macAddress!!,
      ipAddress: this.ipAddress!!,
      status: '',
      dashboardName: '',
      roomNo: this.addInitPiForm.value.roomNo.roomNo ?? '',
      dashboardId: -1
    };

    this.piService.initPi(pi).then(_ => {
      this.generalService.showSnackbar("Pi succesfully initialized", "OK")
      this.dialogRef.close()
    }).catch(_ => {
      this.generalService.showSnackbar("Error while initializing pi", "OK");
      this.dialogRef.close()
    })
  }

  declinePiRequest() {
    this.piService.declinePi(this.macAddress!!).then(_ => {
      this.generalService.showSnackbar("Pi succesfully declined", "OK")
      this.dialogRef.close()
    }).catch(_ => {
      this.generalService.showSnackbar("Error while deleting pi", "OK");
    })
  }

}
