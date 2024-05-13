import {Component} from '@angular/core';

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
export class EditpiComponent {
  pi: Pi | undefined
  private piId?: number

  piEditForm: FormGroup = new FormGroup({
    name: new FormControl(),
    roomno: new FormControl()
  });


  constructor(
    private route: ActivatedRoute,
    private piService: PiService,
    private router: Router,
    private generalService: GeneralService
  ) {
    this.route.params.subscribe(params=> {
      this.piId =params['piId'];
    });

    piService.getPi(this.piId!)
      .then((pi: Pi) => {this.pi = pi;})
      .catch(_ => {
        generalService.showSnackbar("No pi available", "OK")
        router.navigate(['/pis'])
      })
  }

  async submitEditPiForm() {

    const editPi: Pi = {
      id: this.pi?.id!!, // Assumes piId is non-null
      name: this.piEditForm.value.name ?? this.pi?.name,
      macAddress: this.pi?.macAddress ?? "",
      roomNo: this.piEditForm.value.roomno?? this.pi?.roomNo,
      status: this.pi?.status ?? "",
      dashboardName: this.pi?.dashboardName ?? ""
    };
    // Call the service to update the Pi data
    await this.piService.editPi(editPi)
      .then(_ => {
        this.generalService.showSnackbar('Pi data successfully updated', 'OK', {duration: 3000})
      }).catch(_ => {
        this.generalService.showSnackbar('Error while updating Pi', 'OK')
      })

    this.router.navigate(["/pis"]);
  }
}
