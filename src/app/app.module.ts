import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {AppComponent} from './app.component';
import {TopMenuComponent} from "./top-menu/top-menu.component";
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./auth.guard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {signupComponent} from "./auth/components/register/signup.component";
import {LoginComponent} from "./auth/components/login/login-component.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {CalculatorComponent} from './calculator/calculator.component';
import {UserRecordsComponent} from './user-records/user-records.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {AppRoutingModule} from "./app-routing.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: "signup", component: signupComponent},
  {path: "", component: CalculatorComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    signupComponent,
    LoginComponent,
    CalculatorComponent,
    UserRecordsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
