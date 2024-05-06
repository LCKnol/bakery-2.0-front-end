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

  macAddress: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.macAddress = navigation?.extras.state?.['data']
  }


  addInitPiForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    roomno: new FormControl('')
  });

  // submitInitPiForm() {
  //   const pi: Pi {
  //     name: this.addInitPiForm.name ?? ''
  //     room: this.addInitPiForm.roomno ?? ''
  //
  // }

}
