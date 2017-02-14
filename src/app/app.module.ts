import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {DropdownModule, PaginationModule,  ModalModule} from "ng2-bootstrap";
import {NavComponent} from "./nav/nav.component";
import {HeaderComponent} from "./header/header.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {DomainComponent} from "./domain/domain.component";
import {UserService} from "./shared/user.service";
import {PaginationCustomizeComponent} from "./shared/component/pagination.customize.component";
import {UserFormComponent} from "./user/user-form/user-form.component";

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    UserListComponent,
    DomainComponent,
    PaginationCustomizeComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    //
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
