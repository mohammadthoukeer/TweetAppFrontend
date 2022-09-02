import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RoutegaurdService } from './service/routegaurd.service';
import { TweetsListComponent } from './tweets-list/tweets-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path:"", redirectTo:"/login", pathMatch:"full" },
  { path:"login", component:LoginComponent },
  { path:"home", component:HomeComponent, canActivate:[RoutegaurdService] },
  { path:"register", component:RegisterComponent },
  { path:"reset", component:ResetPasswordComponent },
  { path:"users/all", component:UserListComponent, canActivate:[RoutegaurdService] },
  { path:"tweets/all", component:TweetsListComponent, canActivate:[RoutegaurdService] },
  { path:"**", component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
