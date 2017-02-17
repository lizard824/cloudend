/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component,OnInit} from '@angular/core';
import {Domain} from "../../shared/domain.service";
import {Pagination} from "../../shared/model/search-model";
import {HttpService} from "../../shared/http.service";
@Component({
  selector: 'domain',
  templateUrl: './domain-list.component.html',
  styleUrls:['domain-list.component.css']
})
export class DomainComponent implements OnInit{
  page:Pagination;
  domain:Domain;
  domainList:Array<Domain>=[];

  constructor(private http:HttpService){}

  ngOnInit(){
    this.page = new Pagination();
    this.domain = new Domain();
    this.search(this.page);
  }

  search(page){
    if (page === '') {
      page = new Pagination();
    }
    page.param = this.domain;
    this.http.post("/api/domain/page", {"domain": page.param, "page": page}).subscribe((res: any) => {
      this.page.totalCount = res.page.totalCount;
      this.page.currentPage = res.page.currentPage;
      this.page.pageCount = res.page.pageCount;
      this.domainList = res.page.result;
    });
  }


  delete(id):void{
    let idList:Array<Number>=[];
    idList[0] = id;
    this.http.post("/api/domain/del",{"idList[]":idList}).subscribe((res:any)=>{

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




