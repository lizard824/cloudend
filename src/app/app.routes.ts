import { Routes } from '@angular/router';
import {UserListComponent} from "./user/user-list/user-list.component";
import {DomainComponent} from "./domain/domain.component";
import {UserFormComponent} from "./user/user-form/user-form.component";

export const rootRouterConfig: Routes = [
  {path: '',   redirectTo: '/user', pathMatch: 'full' },
  {path:'user',component:UserListComponent},
  {path: 'user/form', component: UserFormComponent},
  {path:'domain',component:DomainComponent}
];

