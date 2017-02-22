/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component} from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header',

  templateUrl: './header.component.html',
  styleUrls:['header.component.css']
})
export class HeaderComponent {

  constructor(
    private userService:UserService,
    private router:Router
  ) {
  }

  logout(){
    this.userService.logout();
    this.router.navigate(["/login"]);
  }
}
