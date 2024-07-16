import { Component, OnInit } from '@angular/core';
import {BalanceService} from "../services/BalanceService";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  isLoggedIn: boolean = true;
  isAdmin: boolean = true;
  showCadastroMenu: boolean = false;
  protected userName: string;
  protected balance: number;

  constructor(private balanceService: BalanceService) {}


  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.balanceService.balance$.subscribe(balance => {
      this.balance = balance;
    });
  }

  toggleCadastroMenu(event: Event): void {
    event.preventDefault();
    this.showCadastroMenu = !this.showCadastroMenu;
  }

  logout(): void {
    console.log('User logged out');
    this.isLoggedIn = false;
  }
}
