import {Injectable} from "@angular/core";
import {Headers,Http} from "@angular/http"
import 'rxjs/add/operator/toPromise'
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
