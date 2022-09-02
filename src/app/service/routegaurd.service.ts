import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginSessionService } from './login-session.service';

@Injectable({
  providedIn: 'root'
})
export class RoutegaurdService implements CanActivate{

  constructor(private router:Router,private loginService:LoginSessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isUserLoggedIn()) {
      return true;
    }
    else
      this.router.navigate(['login']);
    return false;
  }
}
