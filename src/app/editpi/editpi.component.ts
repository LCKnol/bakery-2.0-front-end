import {Component, OnInit} from '@angular/core';

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
import { Room } from '../dto/room';
import {DashboardDto} from "../dto/dashboardDto";
import {DashboardService} from "../services/dashboard.service";


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
    MatMiniFabButton
  ],
  templateUrl: './editpi.component.html',
  styleUrl: './editpi.component.css'
})
export class EditpiComponent implements OnInit {
  piEditForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    roomNo: new FormControl('')
  });
  pi?: Pi;
  private piId?: number;

  constructor(
    private route: ActivatedRoute,
    private piService: PiService,
    private router: Router,
    private generalService: GeneralService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.piId = +params['piId']; // Convert to a number
    });

    if (this.piId !== undefined) {
      this.piService
        .getPi(this.piId)
        .then((pi: Pi) => {
          this.pi = pi;
          // Initialize form with Pi data and room info if available
          this.piEditForm.setValue({
            name: pi.name,
            roomNo: pi.roomNo
          });
        })
        .catch(() => {
          this.generalService.showSnackbar('No Pi data available', 'OK');
          this.router.navigate(['/pis']);
        });
    }
  }

  async submitEditPiForm() {
    const editPi: Pi = {
      id: this.piId!!, // Assumes piId is non-null
      name: this.piEditForm.value.name,
      roomNo: this.piEditForm.value.roomNo,
      status: this.pi?.status ?? "0",
      display: this.pi?.display ?? "0"
    };


    // Call the service to update the Pi data
    await this.piService.editPi(editPi)
      .then(() => {
        this.generalService.showSnackbar('Pi data successfully updated', 'OK', {duration: 3000});
      })
      .catch(() => {
        this.generalService.showSnackbar('Error while updating Pi', 'OK');
      });

    this.router.navigate(['/pis']);
  }
}
