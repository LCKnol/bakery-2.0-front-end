import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { routes } from './app.routes';
import {HttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: HttpClient },
    provideRouter(routes)
  ]
};
