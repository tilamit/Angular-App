import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output, Renderer } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators, Validator, ControlValueAccessor } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Category } from '../Models/Category';
import { Router } from '@angular/router';
import { ProductService } from '../Services/productservice'
import { HttpClient } from '@angular/common/http';
import { Country } from '../Models/Country';
import { AppComponent } from '../app.component';
import { SetLeaveBO } from '../Models/SetLeaveBO';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientService } from '../Services/httpService';
import { DatePipe } from '@angular/common';
import { isAbsolute } from 'path';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  //template: `
  //  <nz-date-picker [nzFormat]="dateFormat"></nz-date-picker>
  //  <br />
  //`,
  styleUrls: ['./add-person.component.css'],
  styles: [
    `
      nz-month-picker,
      nz-range-picker,
      nz-week-picker {
        margin: 0 20px 12px 0;
      }
    `
  ]
})

export class AddPersonComponent implements OnInit {
  filtersForm: FormGroup;
  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';

  @Input() cleardata: boolean = false;
  @Output() nameEvent = new EventEmitter<string>();
  objtempleave: SetLeaveBO;
  @Input() objcat: Category = new Category();;
  //@ViewChild('nm', { static: false }) nm: ElementRef;
  //@ViewChild('closeBtn') cb: ElementRef;

  dateRange = [];
  public empIds: any[];
  public empLeaveType: any[];
  public empLeave: any[];
  public empDetails: any[];
  public empLeaveDetails: any[];

  countries: any;
  nameId: Number;
  date = null;
  thumbnail: any;
  imageBlobUrl: string = null;
  Url: string;
  selectedValue: string;
  LeaveName: string;
  LeaveDetails: string;
  remaining: number;
  chkLeave: number = 0;
  chkLeaveAllocate: number = 0;
  getLeave: string;
  diffDays: number;
  startDate: Date;
  endDate: Date;
  approvedBy: string;
  empId: string;

  constructor(private renderer: Renderer, private fBuilder: FormBuilder, private datePipe: DatePipe, private httpService: HttpClientService, private dataservice: ProductService, private appComponent: AppComponent, private sanitizer: DomSanitizer, private route: Router, private http: HttpClient) {
    //this.dataservice.GetCategories();

    this.countries = this.getCountries();

    //Validation
    this.filtersForm = this.fBuilder.group({
      "approverList": new FormControl("", [Validators.required]),
      "leaveTypeList": new FormControl("", [Validators.required]),
      "dt2": new FormControl({ value: '', disabled: true }, Validators.compose([Validators.required]))
    });
  }

  setDisabledState(isDisabled: boolean) {
    //this.renderer.setElementProperty(this.nm.nativeElement, 'disabled', isDisabled);
    //(this.dateRange.n, 'disabled', isDisabled);
    // disable other components here
  }

  ngOnInit() {
    this.nameId = 0;
    this.LoadEmpData('');

    this.selectedValue = "";
    this.approvedBy = "";
    this.LeaveName = "";

    this.setDisabledState(true);
  }

  ngAfterViewInit() {
    //this.renderer.setElementProperty(this.nm.nativeElement, 'disabled', true);
}

  onChange(result: Date): void {
    debugger;
    console.log('onChange: ', result[0] + " " + result[1]);

    this.startDate = new Date(result[0]);
    this.endDate = new Date(result[1]);

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    this.diffDays = this.startDate.getDate() - this.endDate.getDate();

    //console.log("Start date: " + this.datePipe.transform(startDate, "yyyy-MM-dd") + "\nEnd date: " + this.datePipe.transform(endtDate, "yyyy-MM-dd")); //output : 2018-02-13
    console.log("Total days: " + (Math.abs(this.diffDays) + 1));

    //Reinitialize the chkLeave and chkLeaveAllocate to 0
    this.chkLeave = 0;
    this.chkLeaveAllocate = 0;

    var start = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    var end = this.datePipe.transform(this.endDate, "yyyy-MM-dd");

    //Iterate through leave allotment
    for (let i = 0; i < this.empLeave.length; i++) {
      if (this.empLeave[i].LeaveName == this.LeaveName && this.empLeave[i].LeaveRemains >= (Math.abs(this.diffDays) + 1)) {
        this.getLeave = this.LeaveName;
        this.chkLeave = 1;
      }
    }

    //Iterate through leave details
    for (let j = 0; j < this.empLeaveDetails.length; j++) {
      if ((this.empLeaveDetails[j].FromDate >= start && this.empLeaveDetails[j].FromDate <= end) || (this.empLeaveDetails[j].ToDate >= start && this.empLeaveDetails[j].ToDate <= end) || (this.empLeaveDetails[j].FromDate < start && this.empLeaveDetails[j].ToDate > end)) {
        this.chkLeaveAllocate = 1;
      }
    }

    if (this.chkLeave == 1) {
      alert("You are eligible for the leave.");
    }
    else {
      alert("Oops! You aren't eligible for the leave.");
    }

    if (this.chkLeaveAllocate == 1) {
      alert("There's already a leave allocation.");
    }
    else {
      alert("Allocated!");
    }
  }

  //Save leave details
  Register(regForm: NgForm) {
    debugger;

    var start = this.datePipe.transform(this.startDate, "yyyy-MM-dd");
    var end = this.datePipe.transform(this.endDate, "yyyy-MM-dd");

    this.objtempleave = new SetLeaveBO();
    this.objtempleave.EmployeeID = this.empId;
    this.objtempleave.LeaveType = this.LeaveName;
    this.objtempleave.approved_day = Math.abs(this.diffDays) + 1;
    this.objtempleave.ApprovedBy = this.approvedBy;
    this.objtempleave.RESON = this.LeaveDetails;
    this.objtempleave.FromDate = start;
    this.objtempleave.ToDate = end;

    //Loop through all controls
    for (let controller in this.filtersForm.controls) {
      this.filtersForm.get(controller).markAsTouched();
    }

    if (this.chkLeave != 1 || this.chkLeaveAllocate == 1) {
      alert("Check date range or leave allocation!");
    }
    else if (this.filtersForm.valid) {
      this.dataservice.AddLeave(this.objtempleave).subscribe(res => {
        alert("Leave added successfully");

        //Call functions on form submit
        this.GetLeaveInfo(this.empId);
        this.GetLeaveDetails(this.empId);
        //this.TakeHome();
      })
      //alert("Allocated!");
    }
  }
  
  //Get DropDown Error
  get hasDropDownError1() {
    return (
      this.filtersForm.get('approverList').touched &&
      this.filtersForm.get('approverList').errors &&
      this.filtersForm.get('approverList').errors.required
    )
  }

  get hasDropDownError2() {
    return (
      this.filtersForm.get('leaveTypeList').touched &&
      this.filtersForm.get('leaveTypeList').errors &&
      this.filtersForm.get('leaveTypeList').errors.required
    )
  }

  selectName() {
    alert(this.nameId);
  }

  getCountries() {
    return [
      new Country(1, 'Bangladesh'),
      new Country(2, 'Germany'),
      new Country(3, 'Canada'),
      new Country(4, 'USA'),
    ];
  }

  LoadEmpData(dept: string) {
    debugger;
    this.dataservice.GetEmpInfo(dept).subscribe(result => {
      this.empIds = result;
    }, error => console.error(error));
  }

  onChangex(selectedValue) {
    debugger;

    //Funcation call here
    this.empId = selectedValue;
    this.GetLeaveInfo(selectedValue);
    this.GetEmpInfo(selectedValue);
    this.GetImages(selectedValue);
    this.GetLeaveType(selectedValue);
    this.GetLeaveDetails(selectedValue);


    console.log(this.empLeave);
    //this.filtersForm.controls['dt2'].disable();
  }

  onChangeLeave(LeaveName) {
    debugger;
    //Validation
    if (LeaveName == "") {
      this.filtersForm.controls['dt2'].disable();
    } else {
      this.filtersForm.controls['dt2'].enable();
    }
  } 

  //Get leave info
  GetLeaveInfo(empId: string) {
    this.dataservice.GetLeaveInfo(empId).subscribe(result => {
      this.empLeave = result;
    }, error => console.error(error));
  }

  //Get employee info
  GetEmpInfo(empId: string) {
    this.dataservice.GetEmpInfo('').subscribe(result => {
      this.empDetails = result.filter(m => m.Emp_Auto_ID == empId);
    }, error => console.error(error));
  }

  //Get employee images
  GetImages(empId: string) {
    this.dataservice.GetImages(empId)
      .subscribe((blob: any) => {
        let objectURL = 'data:image/jpeg;base64,' + blob;
        this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);

        console.log(this.thumbnail);
      });
  }

  //Get Leave Type
  GetLeaveType(empId: string) {
    this.dataservice.GetLeaveType(empId).subscribe(result => {
      this.empLeaveType = result;
    }, error => console.error(error));
  }

  //Get leave details
  GetLeaveDetails(empId: string) {
    this.dataservice.GetLeaveDetails(empId).subscribe(result => {
      this.empLeaveDetails = result;
    }, error => console.error(error));
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.thumbnail = reader.result;
      console.log(reader.result);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
