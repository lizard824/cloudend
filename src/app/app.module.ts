import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {DropdownModule, PaginationModule} from "ng2-bootstrap";
import {NavComponent} from "./nav/nav.component";
import {HeaderComponent} from "./header/header.component";
import {UserComponent} from "./user/user.component";
import {DomainComponent} from "./domain/domain.component";
import {UserService} from "./shared/user.service";
import {PaginationCustomizeComponent} from "./shared/component/pagination.customize.component";


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    UserComponent,
    DomainComponent,
    PaginationCustomizeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DropdownModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
