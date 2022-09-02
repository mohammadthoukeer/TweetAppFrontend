import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { newUser, User } from '../app.component';
import { TweetClientService } from '../service/tweet-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showRegisterSuccess = false;

  exForm!: FormGroup;

  firstname!: string;
  lastname!: string;
  username!: string;
  email!: string;
  password!: string;
  confirmpassword!: string;
  contact!: string;

  raiseError = false;
  showError!: string;

  user!: newUser;
  registeredUser!: any;

  constructor(private tweetService: TweetClientService, private router: Router) { }

  ngOnInit(): void {
    this.exForm = new FormGroup({
      "firstname": new FormControl('', Validators.required),
      "lastname": new FormControl('', Validators.required),
      "username": new FormControl('', Validators.required),
      "email": new FormControl('', [Validators.required,Validators.email]),
      "password": new FormControl('', Validators.required),
      "confirmpassword": new FormControl('', Validators.required),
      "contact": new FormControl('', Validators.required)
    })
  }

  validateForm() {
    if (this.exForm.invalid) {
      this.exForm.get('firstname')?.markAsTouched();
      this.exForm.get('lastname')?.markAsTouched();
      this.exForm.get('username')?.markAsTouched();
      this.exForm.get('email')?.markAsTouched();
      this.exForm.get('password')?.markAsTouched();
      this.exForm.get('confirmpassword')?.markAsTouched();
      this.exForm.get('contact')?.markAsTouched();
      return;
    }
  }

  runRegister() {
    this.user = {
      'firstName' : this.firstname,
      'lastName' : this.lastname,
      'username' : this.username,
      'email' : this.email,
      'password' : this.password,
      'contactNumber' : this.contact
    }

    let response = this.tweetService.registerUser(this.user);
    response.subscribe(data => {
      this.registeredUser = data;
      this.raiseError = false;
      this.showRegisterSuccess = true;

      this.router.navigate(['login']);
    },
    error => { 
      this.raiseError = true; 
      this.showError = error.error.message;
    });
  }

}
