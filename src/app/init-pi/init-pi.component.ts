import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {GeneralService} from "../services/general.service";
import {Pi} from "../dto/pi";
import { ActivatedRoute } from '@angular/router';
import {PiService} from "../services/pi.service";


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
  ],
  templateUrl: './init-pi.component.html',
  styleUrl: './init-pi.component.css'
})
export class InitPiComponent {
  addInitPiForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    roomno: new FormControl('')
  });

  macAddress: string;

  constructor(private router: Router, private piService: PiService, private generalService: GeneralService) {
    const navigation = this.router.getCurrentNavigation();
    this.macAddress = navigation?.extras.state?.['data']
  }

  submitInitPiForm() {
    const pi: Pi = {
      id: -1,
      name: this.addInitPiForm.value.name ?? '',
      macAddress: this.macAddress,
      status: '',
      dashboardName: '',
      roomno: this.addInitPiForm.value.roomno ?? ''
    };

    this.piService.initPi(pi).then(_ => {
      this.generalService.showSnackbar("Pi succesfully initialized", "OK")
      this.router.navigate(['/piManager']);
    }).catch(_ => {
      this.generalService.showSnackbar("Error while initializing pi", "OK");
    })
  }

  declinePiRequest() {
    this.piService.declinePi(this.macAddress).then(_ => {
      this.generalService.showSnackbar("Pi succesfully declined", "OK")
      this.router.navigate(['/piManager']);
    }).catch(_ => {
      this.generalService.showSnackbar("Error while deleting pi", "OK");
    })
  }

}
