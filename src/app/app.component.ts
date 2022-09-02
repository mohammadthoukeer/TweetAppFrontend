import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TweetApplication';
}

export class newUser {
  constructor(
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public password: string,
    public contactNumber: string) {
  }
}

export class User {
    constructor(
      public firstName: string,
      public lastName: string,
      public username: string,
      public email: string,
      public contactNumber: string 
    ) {}
}