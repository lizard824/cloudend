import { Routes } from '@angular/router';
import {UserListComponent} from "./user/list/user-list.component";
import {DomainComponent} from "./domain/domain.component";
import {UserAddFormComponent} from "./user/add/user-add.component";
import {UserEditFormComponent} from "./user/edit/user-edit.component";
import {UserDetailComponent} from "./user/detail/user-detail.component";

export const rootRouterConfig: Routes = [
  {path: '',   redirectTo: '/user', pathMatch: 'full' },
  {path:'user',component:UserListComponent},
  {path: 'user/add', component: UserAddFormComponent},
  {path:'user/edit/:id',component:UserEditFormComponent},
  {path:'user/detail/:id', component:UserDetailComponent},
  {path:'domain',component:DomainComponent}
];

