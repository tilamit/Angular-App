import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  model: any = {};

  errorMessage: string;
  constructor(private router: Router, private LoginService: LoginService) { }

  ngOnInit() {
    debugger;
    this.isLoggedIn();
  }

  isLoggedIn() {
    debugger;
    if (localStorage.getItem('currentUser') != null) {
      this.router.navigate(['/']);
    }
  };

  login() {
    debugger;
    this.LoginService.Login(this.model).subscribe(
      data => {
        //db3OIsj+BXE9NZDy0t8W3TcNekrF+2d/1sFnWG4HnV8TZY30iTOdtVWJG8abWvB1GlOgJuQZdcF2Luqm/hccMw==
        debugger;
        if (data.Status == "Success") {
          this.router.navigate(['/']);
          this.errorMessage = data.Message;
          debugger;

          localStorage.setItem('currentUser', data.Message);
          localStorage.setItem('Token', data.Token);
        }
        else {
          this.errorMessage = data.Message;
        }
      },
      error => {
        this.errorMessage = error.message;
      });
  };
}     
