/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component,OnInit} from '@angular/core';
import {DomainService} from '../shared/domain.service'

@Component({
  selector: 'domain',
  templateUrl: './domain.component.html',
  styleUrls:['domain.component.css']
})
export class DomainComponent implements OnInit{
  currentPage:number = 2;
  totalItems:number = 200;
  domains:Domain[];
  domainList:Array<Domain> = [
    {id:1,sysname:'XOPS',domainname:'www.xops.xpaas.com',servicename:'http://xops.xpaas.com',signurl:'http://xops.xpaas.com/sign',logouturl:'http://xops.xpaas.com/logout'},
    {id:2,sysname:'Ticket',domainname:'wwww.hiticket.xpaas.com',servicename:'http://hiticket.xpaas.com',signurl:'http://hiticket.xpaas.com/sign',logouturl:'http://hiticket.xpaas.com/sign'}
  ];

  constructor(
    private domainService:DomainService
  ){}

  ngOnInit(){

  }

  search(pageIndex){

  }

  add(sysname:string,domainname:string):void{
    sysname = sysname.trim();
    this.domainService.create(sysname)
      .then(domain =>{
        this.domains.push(domain);
      });



  }

  delete(domain:Domain):void{
    this.domainService
      .delete(domain.id)
      .then(()=>{
        this.domains = this.domains.filter(d=>d!== domain);
      })
  }




}



export class Domain{
   id:number;
   sysname:string;
   domainname:string;
   servicename:string;
   signurl:string;
   logouturl:string;
}
