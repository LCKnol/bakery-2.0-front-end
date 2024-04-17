import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatFabButton, MatMiniFabButton } from "@angular/material/button";
import { RouterModule } from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatButton, RouterModule, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
