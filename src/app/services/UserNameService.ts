// balance.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private balanceSubject = new BehaviorSubject<number>(this.getBalanceFromStorage());
  private userNameSubject = new BehaviorSubject<string>(this.getUserNameFromStorage());

  balance$ = this.balanceSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();


  private getBalanceFromStorage(): number {
    const balance = localStorage.getItem('balance');
    return balance ? parseFloat(balance) : 0;
  }

  private getUserNameFromStorage(): string {
    const userName = localStorage.getItem('email');
    return userName ? userName : '';
  }

  setBalance(newBalance: number): void {
  //  localStorage.setItem('balance', newBalance.toString());
    this.balanceSubject.next(newBalance);
  }

  setUserName(newUserName: string): void {
    localStorage.setItem('userName', newUserName);
    this.userNameSubject.next(newUserName);
  }
}
