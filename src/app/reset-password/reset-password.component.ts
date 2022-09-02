import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetClientService } from '../service/tweet-client.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  exForm!: FormGroup;

  username!: string;
  email!: string;
  password!: string;
  confirmpassword!: string;

  raiseError = false;
  showError!: string;

  resetPassword!: any;

  constructor(private tweetService:TweetClientService,private router:Router) { }

  ngOnInit(): void {
    this.exForm = new FormGroup({
      "username": new FormControl('', Validators.required),
      "email": new FormControl('', [Validators.required,Validators.email]),
      "password": new FormControl('', Validators.required),
      "confirmpassword": new FormControl('', Validators.required)
    })
  }

  validateForm() {
    if (this.exForm.invalid) {
      this.exForm.get('username')?.markAsTouched();
      this.exForm.get('email')?.markAsTouched();
      this.exForm.get('password')?.markAsTouched();
      this.exForm.get('confirmpassword')?.markAsTouched();
      return;
    }
  }

  runResetPassword() {
    this.resetPassword = {
      'email' : this.email,
      'password' : this.password
    }

    this.tweetService.resetPassword(this.resetPassword,this.username).subscribe(data => {
      this.raiseError = false;
      this.tweetService.showResetSuccess = true;
      this.router.navigate(['login']);
    },error => {
      console.log(error);
      this.raiseError = true; 
      this.showError = error.error.message;
    });
  }

}
