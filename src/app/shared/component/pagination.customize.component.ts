/**
 * Created by duanxc1 on 1/15/2017.
 */
import {Component} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'pagination-customize',
  templateUrl: './pagination.customize.component.html'
})
export class PaginationCustomizeComponent{
  @Input() totalItems: number;
  @Input() currentPage: number;
  public itemsPerPage: number = 15;
  public maxSize:number =1;

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

}
