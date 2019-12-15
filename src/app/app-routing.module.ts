import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CategoryViewModel } from './Models/CategoryViewModel';
import { Router } from '@angular/router';
import { Product } from './Models/Product';
import { AppComponent } from './app.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: AppComponent,
    data: {
      title: 'Dashboard Page'
    }
  },
  {
    path: 'add-person',
    component: AddPersonComponent,
    pathMatch: 'full',
    data: {
      title: 'Add Details'
    }
  },
];    

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
