import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSessionService } from '../service/login-session.service';
import { TweetClientService } from '../service/tweet-client.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService:LoginSessionService,public tweetService:TweetClientService) { }

  ngOnInit(): void {}

  isLoggedIn() {
    return this.loginService.isUserLoggedIn();
  }

  logout() {
    this.loginService.logout();
  }

  get username() {
    return localStorage.getItem('username')?.toUpperCase();
  }

  disableResetSuccess() {
    this.tweetService.showResetSuccess = false;
  }

  disableRegisterSuccess() {
    this.tweetService.showRegisterSuccess = false;
  }

  disablePostTweetSuccess(){
    this.tweetService.showPostTweetSuccess = false;
  }

  disableDeleteTweetSuccess(){
    this.tweetService.showDeleteTweetSuccess = false;
  }
}
