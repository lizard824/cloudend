/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component,OnInit} from '@angular/core';

@Component({
  selector: 'domain',
  templateUrl: './domain.component.html',
  styleUrls:['domain.component.css']
})
export class DomainComponent implements OnInit{
  currentPage:number = 2;
  totalItems:number = 200;
  domainList:Array<Domain> = [
    {id:1,sysname:'XOPS',domainname:'www.xops.xpaas.com'},
    {id:2,sysname:'Ticket',domainname:'wwww.hiticket.xpaas.com'}
  ];
  
  ngOnInit(){
    
  }

  search(pageIndex){

  }

}



export class Domain{
   id:number;
   sysname:string;
   domainname:string;
}