import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { newUser } from '../app.component';
import { LoginSessionService } from './login-session.service';

@Injectable({
  providedIn: 'root'
})
export class TweetClientService {

  //baseUrl = "http://localhost:8888/api/v1.0/tweets/";
  baseUrl = "http://tweetappbackend-env.eba-tamjyui2.us-east-2.elasticbeanstalk.com/api/v1.0/tweets/";

  showResetSuccess!: any;
  showRegisterSuccess!: any;
  showPostTweetSuccess!: any;
  showDeleteTweetSuccess!: any;

  constructor(private http: HttpClient, private loginService: LoginSessionService, private router: Router) {
    this.showResetSuccess = false;
    this.showRegisterSuccess = false;
    this.showPostTweetSuccess = false;
    this.showDeleteTweetSuccess = false;
  }

  JWT = localStorage.getItem('token')

  public generateToken(request: any) {
    let response = this.http.post(this.baseUrl + "login", request);
    return response;
  }

  public validateToken(){
    let token: any = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', token);
    let response = this.http.get(this.baseUrl + "validate", { headers });
    return response;
  }

  public registerUser(user: newUser){
    let response =  this.http.post(this.baseUrl + "register", user);
    return response;
  }

  public resetPassword(resetPasswordUser: any,username: any){
    let url = this.baseUrl + username + "/forgot";
    let response = this.http.put(url,resetPasswordUser);
    return response;
  }

  public getAllUsers(){
    this.validateToken().subscribe(data => { 
      if(!data) {
        this.loginService.logout();
      }
    });
    let response = this.http.get(this.baseUrl + "users/all");
    return response;
  }

  public getAllTweets(){
    this.validateToken().subscribe(data => { 
      if(!data) {
        this.loginService.logout();
      }
    });
    let response = this.http.get(this.baseUrl + "all");
    return response;
  }

  public getAllTweetsByUser(username: any){
    this.validateToken().subscribe(data => { 
      if(!data) {
        this.loginService.logout();
      }
    });
    let url = this.baseUrl + username;
    let response = this.http.get(url);
    return response;
  }

  public likeTweet(tweet: any) {
    this.validateToken().subscribe(data => { 
      if(!data) {
        this.loginService.logout();
      }
    });
    let username = localStorage.getItem('username');
    let url = this.baseUrl + username + "/like/" + tweet.id;
    let response = this.http.put(url,{});
    return response;
  }

  public postTweet(tweet:any) {
    this.validateToken().subscribe(data => { 
      if(!data) {
        this.loginService.logout();
      }
    });
    let username = localStorage.getItem('username');
    let url = this.baseUrl + username + "/add";
    let response = this.http.post(url,tweet);
    return response;
  }

  public deleteTweet(tweet:any) {
    this.validateToken().subscribe(data => { 
      if(!data) {
        this.loginService.logout();
      }
    });
    let username = localStorage.getItem('username');
    let url = this.baseUrl + username + "/delete/" + tweet.id;
    let response = this.http.delete(url);
    return response;
  }

  public editTweet(tweet:any) {
    this.validateToken().subscribe(data => { 
      if(!data) {
        this.loginService.logout();
      }
    });
    let username = localStorage.getItem('username');
    let url = this.baseUrl + username + "/update/" + tweet.id;
    let response = this.http.put(url,tweet);
    return response;
  }

  public replyTweet(tweet: any, parentTweetId: any) {
    this.validateToken().subscribe(data => { 
      if(!data) {
        this.loginService.logout();
      }
    });
    let username = localStorage.getItem('username');
    let url = this.baseUrl + username + "/reply/" + parentTweetId;
    let response = this.http.post(url,tweet);
    return response;
  }

}
