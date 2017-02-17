/**
 * Created by duanxc1 on 2/13/2017.
 */
import {Component, OnInit} from '@angular/core';
import {User, UserService} from "../../shared/user.service";
import {Params, ActivatedRoute} from "@angular/router";
import {HttpService} from "../../shared/http.service";

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['user-detail.component.css']
})

export class UserDetailComponent implements OnInit{
  user:User = new User();

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private http: HttpService){
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.http.get("/api/user/edit/" + params["id"]).subscribe((res: any) => {
        if (res.success) {
          this.user = res.result;
        }
      });
    });
  }

  userType(type: number) {
    return this.userService.userType(type);
  }

  userGender(sex: number){
    return this.userService.userGender(sex);
  }

  userValid(isvalid: number){
    return this.userService.userValid(isvalid);
  }
}
