/**
 * Created by duanxc1 on 2/20/2017.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor() { }

  /**
   * 根据cookie name获取cookie value
   */
  public getCookie(name) {
    if (typeof (document) == "undefined") {
      return null;
    }
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  public setCookie(name, value, path, expireDays) {
    let cookieValue = name + "=" + value;
    if (null != expireDays) {
      let d: Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      cookieValue += "; expires=" + d.toUTCString();
    }
    if (null != path && path.length > 0) {
      cookieValue += "; path=" + path;
    }
    document.cookie = cookieValue;
  }

  public deleteCookie(name) {
    this.setCookie(name, "", "", -1);
  }
}
