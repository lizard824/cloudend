import {Injectable} from "@angular/core";
/**
 * Created by duanxc1 on 1/15/2017.
 */
@Injectable()
export class UserService {
  public static AUTHTYPE = {
    1: "Local",
    2: "LDAP",
  };

  public userType(type: number) {
    return UserService.AUTHTYPE[type];
  }
}
