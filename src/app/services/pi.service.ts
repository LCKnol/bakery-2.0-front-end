import {Injectable} from "@angular/core";
import {Pi} from "../dto/pi";
import {GeneralService} from "./general.service";
import {Url} from "./api-endpoints";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PiService {

  constructor(private generalService: GeneralService, private router: Router) {
  }

  async initPi(pi: Pi) {
    await this.generalService.post(Url.pi + "/init", pi)
    this.router.navigate(["/"])
    this.generalService.showSnackbar("Pi initialized", "OK")
  }
}
