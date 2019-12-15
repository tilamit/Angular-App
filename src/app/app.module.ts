import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
//import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { CategoryComponent } from './category/category.component';
import { UpdatePersonComponent } from './update-person/update-person.component';
import { ShowCategoriesComponent } from './show-categories/show-categories.component';
import { ComDetailsComponent } from './com-details/com-details.component';
import { LayoutModule, AccordionModule, AlertModule } from 'angular-admin-lte';    //Loading layout module
import { BoxModule } from 'angular-admin-lte';       //Box component
import { adminLteConf } from './admin-lte.conf';
import { SideLeftInnerComponent } from './side-left-inner/side-left-inner.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientService } from './Services/httpService';
import { DatePipe } from '@angular/common';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent,
    children: [
      { path: 'show-categories', component: ShowCategoriesComponent },
      { path: 'add-person', component: AddPersonComponent },
      { path: 'update-person/:id', component: UpdatePersonComponent, pathMatch: 'full' },
      { path: 'com-details', component: ComDetailsComponent, pathMatch: 'full' }
    ]
  }];


//const appRoutes: Routes = [
//  //{ path: 'UI/part1/Details', component: AppComponent },
//  { path: '', redirectTo: 'login', pathMatch: 'full', },
//  { path: 'login', component: LoginComponent },
//  { path: 'show-categories', component: ShowCategoriesComponent },
//  { path: 'add-person', component: AddPersonComponent },
//  { path: 'update-person/:id', component: UpdatePersonComponent },
//  { path: 'com-details', component: ComDetailsComponent }];

//export const routes: Routes = [
//  {
//    path: '',
//    redirectTo: 'login',
//    pathMatch: 'full',
//  },
//  {
//    path: 'login',
//    component: LoginComponent,
//    data: {
//      title: 'Login Page'
//    }
//  },
//  {
//    path: 'updateperson',
//    component: UpdatePersonComponent,
//    data: {
//      title: 'Dashboard Page'
//    }
//  },
//  {
//    path: 'add-person',
//    component: AddPersonComponent,
//    pathMatch: 'full',
//    data: {
//      title: 'Add Details'
//    }
//  },
//]; 

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AddPersonComponent,
    CategoryComponent,
    UpdatePersonComponent,
    ShowCategoriesComponent,
    ComDetailsComponent,
    SideLeftInnerComponent,
    UserAuthenticationComponent,
    LoginComponent,
    MainComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    AlertModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AccordionModule,
    //RouterModule.forChild(appRoutes),
    LayoutModule.forRoot(adminLteConf),   //Provide the configuration to the layout module.
    /** import ng-zorro-antd root module，you should import NgZorroAntdModule and avoid importing sub modules directly **/
    NgZorroAntdModule
  ],

  /** config ng-zorro-antd i18n (language && date) **/
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientService,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//import { BrowserModule } from '@angular/platform-browser';
//import { NgModule } from '@angular/core';
//import { HttpModule } from '@angular/http';

//import { AppRoutingModule } from './app-routing.module';
//import { AppComponent } from './app.component';

//@NgModule({
//  declarations: [
//    AppComponent
//  ],
//  imports: [
//    BrowserModule,
//    AppRoutingModule
//  ],
//  providers: [],
//  bootstrap: [AppComponent]
//})
//export class AppModule { }
