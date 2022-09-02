import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TweetClientService } from '../service/tweet-client.service';

@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {

  refreshTweets = new BehaviorSubject<Boolean>(true);
  refreshUserTweets = new BehaviorSubject<Boolean>(true);
  tweets!: any;
  userTweets!: any;
  userSearch!:any;
  hideReplies: boolean[] = [];
  hideUserReplies: boolean[] = [];
  @ViewChild('closePostModal') closePostModal: any;
  @ViewChild('closeDeleteModal') closeDeleteModal: any;
  @ViewChild('closeEditModal') closeEditModal: any;
  @ViewChild('closeReplyModal') closeReplyModal: any;

  username!: any;
  response!: any;
  userResponse!: any;

  replyTweet!: any;
  replyTweetMessage!: any;
  replyTweetTag!: any;
  replyTweetForm!: FormGroup;

  postTweetMessage!: any;
  postTweetTag!: any;
  postTweetForm!: FormGroup;

  editTweet!: any;
  editTweetMessage!: any;
  editTweetTag!: any;
  editTweetForm!: FormGroup;

  deleteTweet!: any;

  constructor(private tweetService:TweetClientService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    
    this.response = this.tweetService.getAllTweets();
    this.userResponse = this.tweetService.getAllTweetsByUser(this.username);

    this.tweets = this.refreshTweets.pipe(switchMap(test => this.response));
    this.userTweets = this.refreshUserTweets.pipe(switchMap(test => this.userResponse));

    this.replyTweetForm = new FormGroup({
      "replyTweetMessage": new FormControl('', [Validators.required,Validators.maxLength(144)]),
      "replyTweetTag": new FormControl('', Validators.maxLength(50))
    });
    this.postTweetForm = new FormGroup({
      "postTweetMessage": new FormControl('', [Validators.required,Validators.maxLength(144)]),
      "postTweetTag": new FormControl('', Validators.maxLength(50))
    });
    this.editTweetForm = new FormGroup({
      "editTweetMessage": new FormControl('', [Validators.required,Validators.maxLength(144)]),
      "editTweetTag": new FormControl('', Validators.maxLength(50))
    });

  }

  validateReplyTweetForm(){
    if (this.replyTweetForm.invalid) {
      this.replyTweetForm.get('replyTweetMessage')?.markAsTouched();
      return;
    }
  }

  validatePostTweetForm(){
    if (this.postTweetForm.invalid) {
      this.postTweetForm.get('postTweetMessage')?.markAsTouched();
      return;
    }
  }

  validateEditTweetForm(){
    if (this.editTweetForm.invalid) {
      this.editTweetForm.get('editTweetMessage')?.markAsTouched();
      return;
    }
  }

  isLiked(tweet: any){
    if(tweet.likedBy.includes(this.username)) {
      return true;
    }
    return false;
  }

  like(tweet: any){
    this.tweetService.likeTweet(tweet).subscribe(data => {
      this.refreshTweets.next(true);
      this.refreshUserTweets.next(true);
    });
  }

  post(){
    if(this.postTweetForm.valid){
      this.closePostModal.nativeElement.click();
      let postTweet: any = {};
      if(this.postTweetForm.value.postTweetMessage){ postTweet.tweet = this.postTweetForm.value.postTweetMessage; }
      if(this.postTweetForm.value.postTweetTag){ postTweet.tweetTag = this.postTweetForm.value.postTweetTag; }
      this.tweetService.postTweet(postTweet).subscribe(data => {
        this.refreshTweets.next(true);
        this.refreshUserTweets.next(true);
        this.tweetService.showPostTweetSuccess = true;
      });
    }
  }

  edit(){
    if(this.editTweetForm.valid){
      this.closeEditModal.nativeElement.click();
      if(this.editTweetForm.value.editTweetMessage){ this.editTweet.tweet = this.editTweetForm.value.editTweetMessage; }
      if(this.editTweetForm.value.editTweetTag){ this.editTweet.tweetTag = this.editTweetForm.value.editTweetTag; }
      this.tweetService.editTweet(this.editTweet).subscribe(data => {
        this.refreshTweets.next(true);
        this.refreshUserTweets.next(true);
      });
    }
  }

  delete(){
    this.closeDeleteModal.nativeElement.click();
    this.tweetService.deleteTweet(this.deleteTweet).subscribe(data => {
      this.refreshTweets.next(true);
      this.refreshUserTweets.next(true);
      this.tweetService.showDeleteTweetSuccess = true;
    });
  }

  reply(){
    if(this.replyTweetForm.valid) {
      this.closeReplyModal.nativeElement.click();
      let tweet: any = {}
      if(this.replyTweetForm.value.replyTweetMessage){ tweet.tweet = this.replyTweetForm.value.replyTweetMessage; }
      if(this.replyTweetForm.value.replyTweetTag){ tweet.tweetTag = this.replyTweetForm.value.replyTweetTag; }
      this.tweetService.replyTweet(tweet,this.replyTweet.id).subscribe(data => {
        this.refreshTweets.next(true);
        this.refreshUserTweets.next(true);
      });
    }
  }

}
