import { Routes } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {DomainComponent} from "./domain/domain.component";

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {path:'user',component:UserComponent},
  {path:'domain',component:DomainComponent}
];

