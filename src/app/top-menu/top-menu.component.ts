import {Component, OnInit} from '@angular/core';
import {UserInfoService} from "../services/UserNameService";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = true;
  showCadastroMenu: boolean = false;
  protected userName: string;
  protected balance: number;

  constructor(private userInfoService: UserInfoService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {

    this.userInfoService.userName$.subscribe(userName => {
      this.userName = userName;
    });

    this.userInfoService.balance$.subscribe(balance => {
      this.balance = balance;
    });

    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    this.isLoggedIn = this.isLogged();
  }

  private isLogged(): boolean {
    if (this.userName || this.userName != 'undefined') {
      return this.isLoggedIn = true;
    }
    return false;
  }

  toggleCadastroMenu(event: Event): void {
    event.preventDefault();
    this.showCadastroMenu = !this.showCadastroMenu;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
