import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { signupComponent } from './components/register/signup.component';
import { LoginComponent } from './components/login/login-component.component';

const routes: Routes = [
  { path: "register", component: signupComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
