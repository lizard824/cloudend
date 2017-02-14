/**
 * Created by shenkai2 on 1/19/2017.
 */
import {Injectable} from "@angular/core";
import {Headers,Http} from "@angular/http";
import {Domain} from "../domain/domain.component"
import  'rxjs/add/operator/toPromise'

@Injectable
export class domainService{

  private domainUrl = '';
  private headers = new Headers({'Content-Type':'application/json'});

  constructor(private http:Http){}

  getDomains(): Promise<Domain[]>{
    return this.http.get(this.domainUrl)
      .toPromise()
      .then(response=> response.json().data as Domain[])
      .catch(this.handleError);
  }

  create(sysname:string):Promise<Domain>{
    return this.http
      .post(this.domainUrl,JSON.stringify({sysname:sysname}),{headers:this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id:number):promise<void>{
    return this.http.delete(url,{headers:this.headers})
      .toPromise()
      .then(()=>null)
      .catch(this.handleError);
  }

  private handleError(error:any):Promise<any>{
    console.error('An error occurred',error);
    return Promise.reject(error.message || error);
  }
}

