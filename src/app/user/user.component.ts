/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";

@Component({
  selector: 'user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  currentPage:number = 4;
  totalItems:number = 120;
  userList:Array<User> = [
    {id: 1, username: 'satoshi', authtype:1,lastlogintime:"2017-01-12 16:59:20"},
    {id: 2, username: 'ohno', authtype:2,lastlogintime:"2017-01-12 16:59:20"},
    {id: 3, username: 'duanxc1', authtype:2,lastlogintime:"2017-01-12 16:59:20"},
  ];
  username:string;
  constructor(private userService:UserService){
  }

  ngOnInit() {

  }

  search(pageIndex){

  }

  userType(type: number) {
    return this.userService.userType(type);
  }
}

export class User{
  id:number;
  username:string;
  authtype:number;
  lastlogintime:string
}


