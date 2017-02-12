import {Injectable} from "@angular/core";
import {RequestOptionsArgs, Headers, Http, Response, RequestMethod} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by duanxc1 on 2/9/2017.
 */
@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    options = this.requestWrapper({ url: url, method: RequestMethod.Get, body: "" }, options);

    return this.http.get(url, options)
      .map(res => {
        return res.json() || {};
      })
      .catch((err, caught) => {
        return Observable.throw(err);
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this.requestWrapper({ url: url, method: RequestMethod.Post}, options);

    return this.http.post(url, body, options)
      .map(res => {
        return res.json() || {};
      })
      .catch((err, caught) => {
        return Observable.throw(err);
      });
  }

  private requestWrapper(requestArgs: RequestOptionsArgs, options?: RequestOptionsArgs): RequestOptionsArgs {
    if (!options) {
      options = {};
    }
    options.url = requestArgs.url;
    options.method = requestArgs.method;
    if (!options.headers) {
      options.headers = new Headers();
    }
    if (null != requestArgs.body) {
      options.body = requestArgs.body;
    }

    options.headers.append('Content-Type', 'application/json');
    return options;
  }
}
