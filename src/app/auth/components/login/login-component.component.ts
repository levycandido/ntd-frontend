import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {JwtService2} from "../../service/jwt-service2.service";
import {catchError, switchMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {NotificationService} from "../../../services/NotificationService";
import {UserService} from "../../../services/UserService";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;

  constructor(
    private service: JwtService2,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.service.login(this.loginForm.value).pipe(
      tap(response => {
        if (response.jwt) {
          localStorage.setItem('token', response.jwt);
        }
      }),
      switchMap(response => {
        if (response.jwt) {
          return this.userService
            .findByEmail(this.getUser());
        } else {
          return of(null);
        }
      }),
      tap(userDetails => {
        if (userDetails) {
          localStorage.setItem('email', userDetails.email);
          localStorage.setItem('userName', userDetails.username);
          localStorage.setItem('balance', userDetails.balance);

          this.router.navigate(['/']);
        }
      }),
      catchError(error => {
        if (error.status === 403) {
          this.notificationService
            .showError('Access Denied: Invalid credentials', error.error.message);
        } else {
          this.notificationService
            .showError(error.error.message);
        }
        return of(null);
      })
    ).subscribe();
  }

  private getUser(): User {
    return {
      password: '',
      userName: '',
      email: this.loginForm?.get('email')?.value,
      status: '',
      balance: 0
    }
  }
}
