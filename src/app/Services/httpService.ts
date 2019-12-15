import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})


export class HttpClientService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    request = request.clone({ headers: request.headers.set('content-type', 'application/json') });
    request = request.clone({ headers: request.headers.set("Authorization", "Bearer " + localStorage.getItem('Token')) });

    return next.handle(request).catch(err => {
      // onError
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        console.log(err.status);
        console.log(err.statusText);
        if (err.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
      }
      return Observable.throw(err);
    }) as any;;
  }
}

//export class HttpClientService { 

//  value: any;

//  constructor(private http: HttpClient) { }
//  createAuthorizationHeader(headers: HttpHeaders) {
//    //headers.append('content-type', 'application/json');
//    //headers.append("Authorization", "Bearer " + localStorage.getItem('Token'));
//  }

//  get(url, value, dept) {
//    debugger;
//    let params = new HttpParams().set("dept", dept);
//    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + value);

//    const httpOptions = {
//      headers: headers_object
//    };

//    return this.http.get<any>(url, {
//      headers: headers_object, params: params
//    });
//  }

//  post(url, data, value) {
//    let params = new HttpParams();
//    let headers_object = new HttpHeaders();
//    headers_object.append('content-type', 'application/json');
//    headers_object.append("Authorization", "Bearer " + value);

//    //this.createAuthorizationHeader(headers);
//    return this.http.post<any>(url, data, {
//      headers: headers_object, params: params
//    });
//  }
//}
