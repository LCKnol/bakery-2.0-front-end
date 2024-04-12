import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BakeryFrontEnd';
}
