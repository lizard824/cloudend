/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component} from '@angular/core';

@Component({
  selector: 'domain',
  templateUrl: './domain.component.html',
  styleUrls:['domain.component.css']
})
export class DomainComponent {
  currentPage:number = 2;
  totalItems:number = 200;
}
