import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LayoutModule } from 'angular-admin-lte';    //Loading layout module
import { BoxModule } from 'angular-admin-lte';       //Box component
import { CategoryViewModel } from '../Models/CategoryViewModel';
import { ProductService } from '../Services/productservice';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  //styleUrls: ['./employee-add.component.sass']
})

export class MainComponent {

  @Input() cleardata: boolean = false;
  @Output() nameEvent = new EventEmitter<string>();
  objtempcat: CategoryViewModel;
  @Input() objcat: CategoryViewModel = new CategoryViewModel();;
  //@ViewChild('closeBtn') cb: ElementRef;
  public values: any[];
  id: string;

  @Input() model: any;   // instead of any, specify your type

  constructor(private router: Router, private LoginService: LoginService, private dataservice: ProductService, private route: Router, private http: HttpClient) {
    if (!this.LoginService.Login(this.model)) {
      this.route.navigate(['login']);
    }
  }

  ngOnInit() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    debugger;
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['/login']);
    }
  };

  //TakeHome() {
  //  this.nameEvent.emit("ccc");
  //  this.cb.nativeElement.click();
  //  this.route.navigateByUrl('');
  //}
}


//import { Component, Inject } from '@angular/core';
//import { Http } from '@angular/http';

//@Component({
//    selector: 'app-root',
//    templateUrl: './app.component.html',
//    styleUrls: ['./app.component.css']
//})

//export class AppComponent {
//    title = 'Our First Angular App';
//    public values: object[];

//  constructor(private http: Http) {
//    this.ShowProducts();
//  }

//  /**Show Product Details - Starts**/
//  ShowProducts() {
//    this.http.get('/api/values').subscribe(result => {
//      this.values = result.json() as object[];
//    }, error => console.error(error));
//  }
//  /**Show Product Details - Ends**/
//}

//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-root',
//  templateUrl: './app.component.html',
//  styleUrls: ['./app.component.css']
//})
//export class AppComponent {
//  title = 'OurFirstAngularApp';
//}
