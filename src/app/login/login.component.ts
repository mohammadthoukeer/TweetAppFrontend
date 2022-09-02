import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginSessionService } from '../service/login-session.service';
import { TweetClientService } from '../service/tweet-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ''
  password: string = ''
  exForm!: FormGroup;

  raiseError = false;
  showError!: string;
  Jwt: any = ''
  isLoggedin = false;

  constructor(private tweetService:TweetClientService,private loginService:LoginSessionService,private router: Router) { }

  ngOnInit(): void {

    if(this.loginService.isUserLoggedIn()){
      this.router.navigate(['home']);
    }

    this.exForm = new FormGroup({
      "username": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required)
    })
  }

  validateForm() {
    if (this.exForm.invalid) {
      this.exForm.get('username')?.markAsTouched();
      this.exForm.get('password')?.markAsTouched();
      return;
    }
  }

  runLoginAuth() {
    this.getAccessToken(this.username, this.password)
  }

  public getAccessToken(username: string, password: string) {
    let resp = this.tweetService.generateToken({
      "username": this.username,
      "password": this.password
    });
  
    resp.subscribe(data => {
      this.Jwt = data
      this.isLoggedin = true;
      this.raiseError = false;

      this.loginService.createUserSession(true, this.Jwt.token,this.Jwt.username);
      this.router.navigate(['home']);
    },
      error => { 
        this.raiseError = true; 
        this.showError = error.error.hasOwnProperty('message') ? error.error.message : "Backend Service not running";
      });
  
  }

}
