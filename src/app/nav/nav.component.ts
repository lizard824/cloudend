/**
 * Created by duanxc1 on 1/13/2017.
 */
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(["/user"]);
  }
}
