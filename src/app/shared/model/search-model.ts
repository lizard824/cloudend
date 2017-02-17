/**
 * Created by duanxc1 on 1/27/2017.
 */

export class Pagination {
  //当前页面所在页数
  currentPage = 1;
  //总共多少条
  totalCount: number;
  //每页显示多少条记录
  pageSize = 12;
  pageCount:number;
  result:Array<any>;
}

