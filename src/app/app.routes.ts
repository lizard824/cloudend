import { Routes } from '@angular/router';
import {UserListComponent} from "./user/list/user-list.component";
import {DomainComponent} from "./domain/domain.component";
import {UserAddFormComponent} from "./user/add/user-add.component";
import {UserEditFormComponent} from "./user/edit/user-edit.component";
import {UserDetailComponent} from "./user/detail/user-detail.component";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";

export const rootRouterConfig: Routes = [
  {path: '',   redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'home',component:HomeComponent,
    children: [
      {path:'user',component:UserListComponent},
      {path:'user/add', component: UserAddFormComponent},
      {path:'user/edit/:id',component:UserEditFormComponent},
      {path:'user/detail/:id', component:UserDetailComponent},
      {path:'domain',component:DomainComponent}
    ]},
];

