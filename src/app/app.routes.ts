import { Routes } from '@angular/router';
import {UserListComponent} from "./user/list/user-list.component";
import {DomainComponent} from "./domain/domain.component";
import {UserAddFormComponent} from "./user/add/user-add.component";

export const rootRouterConfig: Routes = [
  {path: '',   redirectTo: '/user', pathMatch: 'full' },
  {path:'user',component:UserListComponent},
  {path: 'user/add', component: UserAddFormComponent},
  {path:'domain',component:DomainComponent}
];

