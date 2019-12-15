import { Injectable, Inject } from '@angular/core';
import { Http, HttpModule, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import { Category } from '../Models/Category';
import { CategoryViewModel } from '../Models/CategoryViewModel';
import { myConfig } from '../Models/Config';
import { Product } from '../Models/Product';
import { Company } from '../Models/Company';
import { SpawnSyncReturns } from 'child_process';
import { url } from 'inspector';
import { User } from '../Models/User';
import { SetLeaveBO } from '../Models/SetLeaveBO';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  categories: Observable<CategoryViewModel[]>;
  newCategory: CategoryViewModel;
  public values: object[];
  Url: string;
  header: any;
  //public id: number;
  //params: HttpParams;

  constructor(private http: HttpClient) {
    //this.GetCategories(this.id);
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  //Get Company Details
  GetCompanies(id: string) {
    let params = new HttpParams().set("id", id);

    //var headers_object = new HttpHeaders();
    //headers_object.append('content-type', 'application/json');
    //headers_object.append("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(headers_object);

    return this.http.get<Company[]>(myConfig, { params: params });
  }

  //Get Category Details
  GetCategories(id: string) {
    let params = new HttpParams().set("id", id);

    //var headers_object = new HttpHeaders();
    //headers_object.append('content-type', 'application/json');
    //headers_object.append("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(headers_object);
   
    return this.http.get<CategoryViewModel[]>(myConfig, { params: params });
  }

  /**Show Product Details - Starts**/
  ShowProducts() {
    return this.http.get<Product[]>(myConfig);
  }
  /**Show Product Details - Ends**/

  //Add Category
  AddCategory(cat: Category) {
    var body = {
      CategoryName: cat.CategoryName, ParentId: cat.ParentId, Description: cat.Description, Status: true, Country: cat.Country
    }

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(headers_object);

    console.log("Category: " + body.CategoryName + " Description: " + body.Description + " Parent: " + body.ParentId + " Status: " + body.Status);

    return this.http.post<Category>(myConfig, body, { /*headers: headers_object*/ });
  }

  UpdateCategory(cat: Category) {
    var body = {
      CategoryId: cat.CategoryId, CategoryName: cat.CategoryName, Country: cat.Country
    }

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(headers_object);

    console.log("Id: " + body.CategoryId + "Category: " + body.CategoryName);

    return this.http.put<Category>(myConfig, body, { /*headers: headers_object*/ });
  }

  UpdateCompany(com: Company) {
    var body = {
      companyName: com.companyName, Address: com.Address, Tel: com.Tel
    }

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(headers_object);

    console.log("Name: " + body.companyName + "Adress: " + body.Address + "Tel: " + body.Tel);

    return this.http.put<Company>(myConfig, body, { /*headers: headers_object*/ });
  }

  GetEmpInfo(dept: string) {
    debugger;

    this.Url = 'http://localhost:53743/api/values/';
    var a = this.Url + 'GetEmpInfo';

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(this.values);

    let params = new HttpParams().set("dept", dept);

    return this.http.get<any>(a, { params: params });
  }

  GetLeaveType(empNo: string) {
    debugger;

    this.Url = 'http://localhost:53743/api/values/';
    var a = this.Url + 'GetLeaveCategory';

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(this.values);

    //const httpOptions = {
    //  headers: headers_object
    //};

    let params = new HttpParams().set("empNo", empNo);

    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.get<SetLeaveBO[]>(a, { params: params });
  }

  GetLeaveInfo(empNo: string) {
    debugger;

    this.Url = 'http://localhost:53743/api/values/';
    var a = this.Url + 'GetEmpLeave';

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(this.values);

    //const httpOptions = {
    //  headers: headers_object
    //};

    let params = new HttpParams().set("empNo", empNo);

    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.get<SetLeaveBO[]>(a, { params: params });
  }

  GetEmpDetails(dept: string) {
    debugger;

    this.Url = 'http://localhost:53743/api/values/';
    var a = this.Url + 'GetEmpInfo';

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(this.values);

    //const httpOptions = {
    //  headers: headers_object
    //};

    let params = new HttpParams().set("dept", dept);

    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.get<User[]>(a, { params: params });
  }

  GetEmpImg(empNo: string) {
    debugger;

    this.Url = 'http://localhost:53743/api/values/';
    var a = this.Url + 'GetEmpImg';

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(this.values);

    //const httpOptions = {
    //  headers: headers_object
    //};

    let params = new HttpParams().set("empNo", empNo);

    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.get<User[]>(a, { params: params });
  }

  getBlob(empNo: string): Observable<Blob> {
    this.Url = 'http://localhost:53743/api/values/';
    var a = this.Url + 'GetEmpImg';

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(this.values);

    //const httpOptions = {
    //  headers: headers_object
    //};

    let params = new HttpParams().set("empNo", empNo);
     
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<Blob>(a, { params: params, responseType: 'blob' as 'json' });
  }

  GetImages(empNo: string) {
    debugger;

    this.Url = 'http://localhost:53743/api/values/';
    var a = this.Url + 'GetImages';

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(this.values);

    //const httpOptions = {
    //  headers: headers_object
    //};

    let params = new HttpParams().set("empNo", empNo);

    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.get<any>(a, { params: params });
  }

  GetLeaveDetails(empNo: string) {
    debugger;

    this.Url = 'http://localhost:53743/api/values/';
    var a = this.Url + 'GetLeaveDetails';

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(this.values);

    //const httpOptions = {
    //  headers: headers_object
    //};

    let params = new HttpParams().set("empNo", empNo);

    const headers = new HttpHeaders().set('content-type', 'application/json');

    return this.http.get<any>(a, { params: params });    
  }

  //Add Leave
  AddLeave(aSetLeaveBO: SetLeaveBO) {
    var body = {
      EmployeeID: aSetLeaveBO.EmployeeID, LeaveType: aSetLeaveBO.LeaveType, approved_day: aSetLeaveBO.approved_day, RESON: aSetLeaveBO.RESON, FromDate: aSetLeaveBO.FromDate, ToDate: aSetLeaveBO.ToDate, ApprovedBy: aSetLeaveBO.ApprovedBy
    }

    //var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('Token'));
    //console.log(headers_object);

    this.Url = 'http://localhost:53743/api/values/'; 
    var a = this.Url + 'SaveLeave';
    console.log("EMPNO: " + body.EmployeeID + " LEAVE_NAME: " + body.LeaveType + " APRV_DAYS: " + body.approved_day + " RESON: " + body.RESON + " LV_FROM: " + body.FromDate + " LV_TO: " + body.ToDate + " APPROVED_BY: " + body.ApprovedBy);
     
    return this.http.post<SetLeaveBO>(a, body, { /*headers: headers_object*/ }); 
  }
}
