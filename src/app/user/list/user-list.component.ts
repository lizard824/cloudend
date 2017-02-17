/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component, OnInit} from '@angular/core';
import {UserService, User} from "../../shared/user.service";
import {Pagination} from "../../shared/model/search-model";
import {HttpService} from "../../shared/http.service";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: Array<User> = [];
  page: Pagination;
  user: User;

  constructor(private userService: UserService,
              private http: HttpService) {
  }

  ngOnInit() {
    this.page = new Pagination();
    this.user = new User();
    this.search(this.page);
  }

  search(page) {
    if (page === '') {
      page = new Pagination();
    }
    page.param = this.user;
    this.http.post("/api/user/page", {"user": page.param, "page": page}).subscribe((res: any) => {
      this.page.totalCount = res.page.totalCount;
      this.page.currentPage = res.page.currentPage;
      this.page.pageCount = res.page.pageCount;
      this.userList = res.page.result;
    });
  }

  del(id){
    let idList:Array<Number>=[];
    idList[0] = id;
    this.http.post("/api/user/del",{"idList[]":idList}).subscribe((res:any)=>{

    });
  }

  userType(type: number) {
    return this.userService.userType(type);
  }
}

