import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Category } from '../Models/Category';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/productservice'
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/Product';
import { AppComponent } from '../app.component';
import { Country } from '../Models/Country';
import { Company } from '../Models/Company';
import { identifierModuleUrl } from '@angular/compiler';
import { debug } from 'util';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit {

  @Input() cleardata: boolean = false;
  @Output() nameEvent = new EventEmitter<string>();
  objtempcat: Category;
  objtempcom: Company;
  @Input() objcat: Category = new Category();;
  @Input() objcom: Company = new Company();;
  //@ViewChild('closeBtn') cb: ElementRef;
  public values: any[];
  inputText: {};
  val: string;
  countries: any;
  item = { id: 3 };

  nameId: Number;
  //id: number;
  
  constructor(private route: ActivatedRoute, private dataservice: ProductService, private appComponent: AppComponent, private http: HttpClient) {
    this.LoadData();
  }

  debugger;
  ngOnInit() {
    
  }

  LoadData() {
    const id = +this.route.snapshot.paramMap.get('id');
    var params = {};
    this.val = id.toString();
    this.dataservice.GetCompanies(this.val).subscribe(result => {
      this.values = result as Company[];
    }, error => console.error(error));

    console.log(id);
  }

  Update(updateForm: NgForm) {
    this.objtempcom = new Company();
    this.objtempcom.companyID = this.val;
    this.objtempcom.Tel = updateForm.value.Tel;

    this.dataservice.UpdateCompany(this.objtempcom).subscribe(res => {
      alert("Contact Details Updated successfully");

      //this.appComponent.LoadData();
      //this.TakeHome();
    })
  }

  //LoadData() {
  //  const id = +this.route.snapshot.paramMap.get('id');
  //  var params = {};
  //  this.val = id.toString();
  //  this.dataservice.GetCategories(this.val).subscribe(result => {
  //    this.values = result as Category[];
      
  //    this.values.forEach(valueAll => {
  //      this.countries = this.getCountries().filter(m => m.id != valueAll.country);
  //      console.log(valueAll.country);
  //    });
  //  }, error => console.error(error));

  //  console.log(id);
  //}

  //Update(updateForm: NgForm) {
  //  this.objtempcat = new Category();
  //  this.objtempcat.CategoryId = this.val;
  //  this.objtempcat.CategoryName = updateForm.value.CategoryName;
  //  this.objtempcat.Country = updateForm.value.Country;

  //  this.dataservice.UpdateCategory(this.objtempcat).subscribe(res => {
  //    alert("Category Updated successfully");

  //    this.appComponent.LoadData();
  //    //this.TakeHome();
  //  })
  //}

  getCountries() {
    return [
      new Country(1, 'Bangladesh'),
      new Country(2, 'Germany'),
      new Country(3, 'Canada'),
      new Country(4, 'USA'),
    ];
  }
}
