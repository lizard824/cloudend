/**
 * Created by duanxc1 on 1/15/2017.
 */
import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {HttpService} from "../http.service";
import {Pagination} from "../model/search-model";
import {User} from "../user.service";

@Component({
  selector: 'pagination-customize',
  templateUrl: './pagination.customize.component.html',
  styleUrls: ['pagination.customize.component.css']
})
export class PaginationCustomizeComponent{
  @Input() page: Pagination;
  @Output() search = new EventEmitter<Pagination>();
  maxSize:number =1;

  constructor(private http: HttpService) {
  }


  public pageChanged(event:any): void {
    this.page.currentPage = event.page;
    this.search.emit(this.page);
  }

}
