import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {routes} from "./app/app.routes";
import {provideRouter} from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
} from "@angular/common/http";

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routes),
      provideHttpClient(), provideAnimationsAsync(),
    ]
  }
).catch(err => console.error(err));
