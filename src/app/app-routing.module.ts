import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserRecordsComponent} from "./user-records/user-records.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {LoginComponent} from "./auth/components/login/login-component.component";
import {signupComponent} from "./auth/components/register/signup.component";

const routes: Routes = [
  { path: '', component: CalculatorComponent },
  { path: 'records', component: UserRecordsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: signupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
