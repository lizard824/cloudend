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
  info:String;

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
    this.http.post("/api/user/page", {"search":{"username":this.user.username}, "page": page}).subscribe((res: any) => {
      this.page.totalCount = res.page.totalCount;
      this.page.currentPage = res.page.currentPage;
      this.page.pageCount = res.page.pageCount;
      this.userList = res.page.result;
    });
  }

  del(id){
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }
    this.http.get("/api/user/del/"+id).subscribe((res:any)=>{
      if (res.success) {
        this.search('');
        this.info="";
      }else{
        this.info=res.msg;
      }
    });
  }

  userType(type: number) {
    return this.userService.userType(type);
  }
}


