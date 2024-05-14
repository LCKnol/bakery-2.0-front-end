import {Component} from '@angular/core';
import { MatSelect, MatOption } from '@angular/material/select';

import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import {NgForOf} from "@angular/common";


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
    NgForOf
  ],
  templateUrl: './editpi.component.html',
  styleUrl: './editpi.component.css'
})
export class EditpiComponent {
  pi: Pi | undefined
  private piId?: number

  piEditForm: FormGroup = new FormGroup({
    name: new FormControl(),
    roomNo: new FormControl()
  });
  rooms: RoomDto[] = []




  constructor(
    private route: ActivatedRoute,
    private piService: PiService,
    private router: Router,
    private generalService: GeneralService,
    private roomService: RoomService
  ) {
    this.route.params.subscribe(params=> {
      this.piId =params['piId']
      this.fetchRooms();

    });

    piService.getPi(this.piId!)
      .then((pi: Pi) => {this.pi = pi;})
      .catch(_ => {
        generalService.showSnackbar("No pi available", "OK")
        router.navigate(['/pis'])
      })
  }

  fetchRooms() {
    // Make an HTTP GET request to your backend API to fetch room numbers
    this.roomService.getAllRooms().then((rooms: RoomCollection) => {
      this.rooms = rooms.rooms
    });
  }


  async submitEditPiForm() {

    const editPi: Pi = {
      id: this.pi?.id!!, // Assumes piId is non-null
      name: this.piEditForm.value.name ?? this.pi?.name,
      roomNo: this.piEditForm.value.roomNo.roomNo ?? '',
      status: this.pi?.status ?? "",
      dashboardName: this.pi?.dashboardName ?? "",
      macAddress: this.pi?.macAddress ?? ""
    };
    // Call the service to update the Pi data
    await this.piService.editPi(editPi)
      .then(_ => {
        this.generalService.showSnackbar('Pi data successfully updated', 'OK', {duration: 3000})
      }).catch(_ => {
        this.generalService.showSnackbar('Error while updating Pi', 'OK')
      })

    this.router.navigate(["/piManager"]);
  }
}
