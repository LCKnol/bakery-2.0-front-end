import {CookieService} from "ngx-cookie-service";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const authGuard = () => {
  var cookieService = inject(CookieService)
  var router = inject(Router);
  var result = cookieService.get("token") == ''
  if (!result) {
    router.navigate(['']);
  }

  return result;
};
