import {Injectable} from "@angular/core";
import {RequestOptionsArgs, Headers, Http, Response, RequestMethod} from "@angular/http";
import {Observable} from "rxjs";
declare var escape: any;
/**
 * Created by duanxc1 on 2/9/2017.
 */
@Injectable()
export class HttpService {
  private jwtToken = "";

  constructor(private http: Http) {
  }

  getJwtToken() {
    return this.jwtToken;
  }

  setJwtToken(token: string) {
    this.jwtToken = token;
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

  put(url: string, body: any, options?: RequestOptionsArgs, callHook = true): Observable<Response> {
    options = this.requestWrapper({ url: url, method: RequestMethod.Put }, options);

    return this.http.put(url, body, options)
      .map(res => {
        return res.json() || {};
      })
      .catch((err, caught) => {
        return Observable.throw(err);
      });
  }

  delete(url: string, options?: RequestOptionsArgs, callHook = true): Observable<Response> {
    options = this.requestWrapper({ url: url, method: RequestMethod.Delete, body: "" }, options);

    return this.http.delete(url, options)
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
    options.headers.append('Authorization', this.jwtToken);
    return options;
  }
}

export class JwtHelper {

  /**
   * Base64 解码
   */
  public urlBase64Decode(str: string) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw 'Illegal base64url string!';
      }
    }

    return decodeURIComponent(escape(typeof window === 'undefined' ? atob(output) : window.atob(output))); //polyfill https://github.com/davidchambers/Base64.js
  }

  /**
   * 反解token第二部分
   * 详见说明：https://jwt.io/introduction/
   */
  public decodeToken(token: string) {
    var parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    var decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }

  /**
   * 解析token过期时间
   */
  public getTokenExpirationDate(token: string) {
    var decoded: any;
    decoded = this.decodeToken(token);

    if (typeof decoded.exp === "undefined") {
      return null;
    }

    var date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  /**
   * 判断jwt token是否过期，过期返回true，没过期返回false
   */
  public isTokenExpired(token: string, offsetSeconds?: number) {
    var date = this.getTokenExpirationDate(token);
    console.log(date);
    offsetSeconds = offsetSeconds || 0;
    if (date === null) {
      return false;
    }

    // Token expired?
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}
