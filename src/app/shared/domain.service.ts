/**
 * Created by shenkai2 on 1/19/2017.
 */
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise'

@Injectable()
export class Domain{
    id: number;
    sysName:string;
    domain:string;
    service:string;
    signUrl:string;
    logoutUrl:string;
}
