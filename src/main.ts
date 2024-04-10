import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import routeConfig from "./app/routes";
import {provideRouter} from "@angular/router";

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig)
    ]
  }
).catch(err => console.error(err));
