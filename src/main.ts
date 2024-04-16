import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {routes} from "./app/app.routes";
import {provideRouter} from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClient, HttpClientModule, HttpHandler, provideHttpClient, withFetch} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routes), provideAnimationsAsync('noop'),
      provideHttpClient(),
      // { provide: CookieService },
    ]
  }
).catch(err => console.error(err));
