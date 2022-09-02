import { Component, OnInit } from '@angular/core';
import { User } from '../app.component';
import { TweetClientService } from '../service/tweet-client.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: any;
  userSearch!: any;

  constructor(private tweetService:TweetClientService) { }

  ngOnInit(): void {
    let response = this.tweetService.getAllUsers();

    response.subscribe(data => {
      this.users = data;
    })
  }

}
