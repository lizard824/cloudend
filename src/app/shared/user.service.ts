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
