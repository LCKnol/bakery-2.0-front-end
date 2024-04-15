import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import routeConfig from "./app/app.routes";
import {provideRouter} from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClient, HttpClientModule, HttpHandler, provideHttpClient, withFetch} from "@angular/common/http";

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig), provideAnimationsAsync('noop'),
      provideHttpClient()
    ]
  }
).catch(err => console.error(err));
