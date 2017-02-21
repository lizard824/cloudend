import { Injectable }     from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot }    from '@angular/router';

import { UserService } from './user.service';

/**
 * router权限守护
 */
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService,
              private router: Router) { }

  /**
   * 验证用户是否登录
   */
  checkAuth(url: string): boolean {
    if (this.userService.authInfo !== null) {
      return true;
    }
    // Navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }

  /**
   * 验证当前router权限
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuth(state.url);
  }

  /**
   * 验证子router权限
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAuth(state.url);
  }
}
