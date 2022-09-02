import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginSessionService {

  constructor(private router: Router) { }

  createUserSession(isLoggedin: any,token: string, username: string) {
    if (isLoggedin) {
      localStorage.setItem('token',token);
      localStorage.setItem('username',username);
      return true;
    }
    else return false;
  }

  isUserLoggedIn() : boolean {
    let user = localStorage.getItem('token');
    return !(user === null);
  }

  logout() {
    if (this.isUserLoggedIn())
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 3000);
  }
}
