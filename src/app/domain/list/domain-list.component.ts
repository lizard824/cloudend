/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component,OnInit} from '@angular/core';
import {Domain} from "../../shared/domain.service";
import {Pagination} from "../../shared/model/search-model";
import {HttpService} from "../../shared/http.service";
import {Router} from "@angular/router";
@Component({
  selector: 'domain',
  templateUrl: './domain-list.component.html',
  styleUrls:['domain-list.component.css']
})
export class DomainComponent implements OnInit{
  page:Pagination;
  domain:Domain;
  domainList:Array<Domain>=[];
  info:String;
  error:String;

  constructor(private http:HttpService,private router: Router,){}

  ngOnInit(){
    this.page = new Pagination();
    this.domain = new Domain();
    this.search(this.page);
  }

  search(page){
    if (page === '') {
      page = new Pagination();
    }

    this.http.post("/api/domain/page", {"search":{"domain": this.domain.sysName}, "page": page}).subscribe((res: any) => {
      this.page.totalCount = res.page.totalCount;
      this.page.currentPage = res.page.currentPage;
      this.page.pageCount = res.page.pageCount;
      this.domainList = res.page.result;
    });
  }


  delete(id){

    this.http.get("/api/domain/del"+id).subscribe((res:any)=>{
      if (res.success) {
        this.search('');
        this.info="";
      }else{
        this.info=res.msg;
      }
    });
  }

  submit(){
    this.http.post("/api/domain/add",this.domain).subscribe((res:any)=>{
      if (res.result==true) {
        this.router.navigate(["/domain"]);
      } else {
        this.error = res.msg;
      }
    });
  }



}




