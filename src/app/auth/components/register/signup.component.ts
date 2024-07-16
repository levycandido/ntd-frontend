import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JwtService2} from "../../service/jwt-service2.service";
import {Router} from "@angular/router";
import {User} from "../../../models/User";

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class signupComponent implements OnInit {

  registerForm: FormGroup | undefined;
  private INITIAL_BALANCE: number = 100;

  constructor(
    private service: JwtService2,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({passwordMismatch: true});
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit() {
    const user: User = this.createUser();
    this.service.addUser(user).subscribe(
      (response) => {
        if (response.id != null) {
          localStorage.setItem('email', response.userName);
          this.router.navigateByUrl("/login");
        }
      }
    );
  }


  private createUser(): User {
    return {
      userName:  this.registerForm?.get('name')?.value,
      password: this.registerForm?.get('password')?.value,
      email: this.registerForm?.get('email')?.value,
      status: 'Active',
      balance: this.INITIAL_BALANCE
    } as User;

  }

}
