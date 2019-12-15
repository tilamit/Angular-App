import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CategoryViewModel } from '../Models/CategoryViewModel';
import { Router } from '@angular/router';
import { ProductService } from '../Services/productservice';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/Product';
import { AppComponent } from '../app.component';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
  styleUrls: ['./show-categories.component.css']
})
export class ShowCategoriesComponent implements OnInit {
  title = 'OurFirstAngularApp';

  @Input() cleardata: boolean = false;
  @Output() nameEvent = new EventEmitter<string>();
  objtempcat: CategoryViewModel;
  @Input() objcat: CategoryViewModel = new CategoryViewModel();;
  //@ViewChild('closeBtn') cb: ElementRef;
  public values: any[];
  public empInfo: any[];
  public empInfo2: any[];
  id: string;
  public deviceValue: string;
  errorMessage: string;

  currentUserId: string;

  constructor(private router: Router, private dataservice: ProductService, private loginservice: LoginService, private route: Router, private http: HttpClient) {
    this.LoadEmpData('');
  }

  ngOnInit() {
    this.LoadEmpData('');

    debugger;
    //this.isLoggedIn();
  }

  LoadEmpData(dept: string) {
    this.dataservice.GetEmpInfo(dept).subscribe(result => {
      this.empInfo = result;
    }, error => console.error(error));
  }

  onChange(selectedValue) {
    console.log(selectedValue);
    this.empInfo = this.empInfo.filter(m => m.Dept_Name == selectedValue);
    console.log(this.empInfo);
  }

  isLoggedIn() {
    debugger;
    //if (localStorage.getItem('currentUser') == null) {
    //  this.router.navigate(['/login']);
    //}
  };

  //LoadData() {
  //  this.dataservice.GetCategories('').subscribe(result => {
  //    this.values = result as object[];
  //  }, error => console.error(error));
  //}
}
