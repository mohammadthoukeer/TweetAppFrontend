import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSessionService } from '../service/login-session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private loginService:LoginSessionService) { }

  ngOnInit(): void {
    if(!this.loginService.isUserLoggedIn()){
      this.router.navigate(['login']);
    }
  }

  get username() {
    return localStorage.getItem('username')?.toUpperCase();
  }

}
