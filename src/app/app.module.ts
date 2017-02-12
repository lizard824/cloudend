import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {DropdownModule, PaginationModule, ModalModule, AlertModule} from "ng2-bootstrap";
import {NavComponent} from "./nav/nav.component";
import {HeaderComponent} from "./header/header.component";
import {UserListComponent} from "./user/list/user-list.component";
import {DomainComponent} from "./domain/domain.component";
import {UserService} from "./shared/user.service";
import {PaginationCustomizeComponent} from "./shared/component/pagination.customize.component";
import {UserAddFormComponent} from "./user/add/user-add.component";
import {HttpService} from "./shared/http.service";


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    UserListComponent,
    DomainComponent,
    PaginationCustomizeComponent,
    UserAddFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    UserService,
    HttpService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
