// balance.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private balanceSubject = new BehaviorSubject<number>(this.getBalanceFromStorage());
  balance$ = this.balanceSubject.asObservable();

  private getBalanceFromStorage(): number {
    const balance = localStorage.getItem('balance');
    return balance ? parseFloat(balance) : 0;
  }

  setBalance(newBalance: number): void {
    localStorage.setItem('balance', newBalance.toString());
    this.balanceSubject.next(newBalance);
  }
}
