import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { myConfig } from '../Models/Config';
import { Login } from '../Models/Login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Url: string;
  token: string;
  header: any;
  values: any;

  constructor(private http: HttpClient) {

    this.Url = 'http://localhost:53743/api/values/';

    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  Login(model: any) {
    debugger;

    var a = this.Url + 'UserLogin';
    return this.http.post<any>(this.Url + 'UserLogin', model);
  }

  isLoggedIn(model: any) {
    debugger;
    var a = this.Url + 'UserLogin';
    return this.http.get<Login>(this.Url + 'UserLogin', model);
  }
}   
