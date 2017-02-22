import {Injectable} from "@angular/core";
import {CookieService} from "./cookie.service";
import {JwtHelper, HttpService} from "./http.service";
import {Router} from "@angular/router";
/**
 * Created by duanxc1 on 1/15/2017.
 */
@Injectable()
export class UserService {

  public static AUTH_KEY = "authInfo";
  //更新token时间，10分钟
  public static REFRESH_INTERVAL = 1000 * 60 * 10;
  //记住我过期时间加倍参数，7天
  public static REMEMBERME_TIMES = 2 * 24 * 7;

  authInfo: AuthInfo;

  constructor(private http: HttpService,
              private jwtHelper: JwtHelper,
              private cookieService: CookieService) {
    this.authInfo = null;
    //从storage中获取token
    let tokenInfo = this.restoreTokenInfo();
    if (null === tokenInfo || tokenInfo === "") {
      return this;
    }
    //反解token信息
    this.authInfo = JSON.parse(tokenInfo);
    //判断jwttoken过期与否
    if (this.jwtHelper.isTokenExpired(this.authInfo.token)) {
      this.authInfo = null;
      return this;
    }
    //设置http全局token
    this.http.setJwtToken("Bearer " + this.authInfo.token);
  }

  login(user:User) {
    return this.http.post('/api/user/admin', user).map((res: any) => {
      this.authInfo = res;
      //存储token到storage
      this.saveTokenInfo();
      //设置全局http大jwt header
      this.http.setJwtToken("Bearer " + this.authInfo.token);
      return res;
    });
  }

  logout() {
    this.authInfo = null;
    //移除token，删除本地storage
    this.http.setJwtToken("");
    this.removeTokenInfo();
  }


  /**
   * 获取用户登陆token
   */
  public restoreTokenInfo() {
    let tokenInfo = localStorage.getItem(UserService.AUTH_KEY);
    if (null == tokenInfo || "" == tokenInfo) {
      tokenInfo = this.cookieService.getCookie(UserService.AUTH_KEY);
    }
    return tokenInfo;
  }

  /**
   * 保存用户token到storage或者session cookie
   */
  public saveTokenInfo() {
      this.cookieService.setCookie(UserService.AUTH_KEY, JSON.stringify(this.authInfo), null, null);
  }

  /**
   * 删除用户token
   */
  public removeTokenInfo() {
    this.cookieService.deleteCookie(UserService.AUTH_KEY);
  }

  public static AUTHTYPE = {
    1: "Local",
    2: "LDAP",
  };

  public static GENDER = {
    0: "Man",
    1: "Woman",
  };

  public static ISVALID = {
    0: "Invalid",
    1: "Valid",
  };

  public userType(type: number) {
    return UserService.AUTHTYPE[type];
  }

  public userGender(sex:number){
    return UserService.GENDER[sex];
  }

  public userValid(isvalid:number){
    return UserService.ISVALID[isvalid];
  }


}

export class User {
  id: number;
  username: string;
  password: string;
  realname: string;
  sex: number;
  authtype: number;
  allowip: string;
  email: string;
  mobilephone: number;
  isvalid: number;
  lastlogintime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class AuthInfo {
  msg: string;
  success: boolean;
  token: string;
}
